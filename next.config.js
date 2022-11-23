const isTest = process.env.NODE_ENV === 'test'

const enableCoverageInstrument = process.env.ENABLE_COVERAGE_INSTRUMENT === 'true'
const swcPlugins = []

if (enableCoverageInstrument) {
  // https://github.com/kwonoj/swc-plugin-coverage-instrument#readme
  // jest 実行時は使用しないこと
  swcPlugins.push(["swc-plugin-coverage-instrument", {}])
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: isTest,
  experimental: {},
}

if (swcPlugins.length > 0) {
  nextConfig.experimental.swcPlugins = swcPlugins
}

module.exports = nextConfig
