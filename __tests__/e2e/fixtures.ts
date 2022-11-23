import { Page, test as base, } from '@playwright/test'
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { AddressInfo } from 'net'
import v8toIstanbul from 'v8-to-istanbul'
import fs from 'fs'
import path, { dirname } from 'path'
import crypto from 'crypto'
import convertSourceMap from 'convert-source-map'

const enableClientSideCoverage = process.env.ENABLE_CLIENT_COVERAGE === 'true'

function generateUUID() {
  return crypto.randomUUID()
}

const basePath = path.resolve(__dirname, '../../')
const nycOutput = path.resolve(basePath, '.nyc_output')
const nextDir = path.resolve(basePath, '.next')

const removeQuery = (url: string) => {
  const [path,] = url.split('?', 2)
  return path
}

const replacePath = (input: string) => {
  if (input.indexOf('http://') === 0) {
    const [, urlPath] = input.split('_next/', 2)
    return path.resolve(nextDir, removeQuery(urlPath || ''))
  } else if (input.indexOf('webpack://') === 0) {
    if (input === 'webpack://_N_E/<anon>') {
      return '<anon>'
    }
    else if (input.indexOf('webpack://_N_E/./') === 0) {
      const replaced = removeQuery(input.substring('webpack://_N_E/./'.length))
      return path.resolve(basePath, replaced)
    }
  } else if (input.indexOf('webpack-internal://') === 0) {
    if (input.indexOf('webpack-internal:///./') === 0) {
      const replaced = removeQuery(input.substring('webpack-internal:///./'.length))
      return path.resolve(basePath, replaced)
    }
  }
  return input
}

export const test = base.extend<{
  // test fixtures の型定義
  page: Page
}, {
  // worker fixtures の型定義
  serverUrl: string
}>({
  page: [async ({ page, browserName }, use) => {
    // ブラウザ側でカバレッジを取得
    // https://playwright.dev/docs/api/class-coverage

    if (browserName !== 'chromium' || !enableClientSideCoverage) {
      use(page)
      return
    }

    await page.coverage.startJSCoverage({
      resetOnNavigation: false,
    })
    await use(page)
    const coverage = await page.coverage.stopJSCoverage()

    for (const entry of coverage) {
      const filePath = replacePath(entry.url)
      const source = entry.source || ''

      // ソースマップを書き換えるため下記を参考に実装
      // https://github.com/istanbuljs/v8-to-istanbul/blob/b5ecd8242cf64389c9a656d78530bd0428edf195/lib/v8-to-istanbul.js#L48-L52
      // @ts-ignore
      const sourceMap = convertSourceMap.fromSource(source) || convertSourceMap.fromMapFileSource(source, (filename: string) => {
        return fs.readFileSync(path.resolve(dirname(filePath), filename), 'utf-8')
      })

      if (sourceMap !== null) {
        // // ソースマップ中の webpack スキーマの URL をファイルパスに書き換える
        sourceMap.sourcemap.sources = sourceMap.sourcemap.sources.map(replacePath)
      }

      const converter = v8toIstanbul(path.resolve(nextDir, filePath), 0, {
        source,
        sourceMap: sourceMap || undefined,
      })
      await converter.load()
      converter.applyCoverage(entry.functions)

      const fileName = path.resolve(nycOutput, 'client_cov_' + generateUUID() + '.json')
      await fs.promises.mkdir(nycOutput, { recursive: true })
      await fs.promises.writeFile(fileName, JSON.stringify(converter.toIstanbul()))
    }
  }, {
    scope: 'test',
  }],
  serverUrl: [async ({ }, use) => {
    // カスタムサーバーとして起動
    // https://nextjs.org/docs/advanced-features/custom-server

    const app = next({
      dev: false,
    })
    const port = 0
    const handle = app.getRequestHandler()

    await app.prepare()

    const server = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url || '', true)

        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('エラーが発生しました', req.url, err)
        res.statusCode = 500
        res.end('サーバー内部でエラーが発生しました')
      }
    })
    server.listen(port, () => {
      const { port } = server.address() as AddressInfo
      const url = `http://localhost:${port}`
      console.log(`> 準備完了: ${url}`)
      use(url)
    })

  }, {
    scope: 'worker',
    auto: true,
  }],
})