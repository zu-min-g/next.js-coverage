Next.js + TypeScript でカバレッジを取得するサンプルです。

## テスト実行

```sh
npm run test
```

カバレッジは `coverage/` ディレクトリに配置します。

* `coverage/ut`: jest で取得したカバレッジ
* `coverage/server`: サーバーサイドで取得したカバレッジ
* `coverage/client`: クライアントサイドで取得したカバレッジ
* `coverage/merged`: 上記をマージした結果
