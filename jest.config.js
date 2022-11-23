const nextJest = require('next/jest')

// 下記を参考に作成
// https://nextjs.org/docs/testing#jest-and-react-testing-library

const createJestConfig = nextJest({
  // next.js アプリケーションの場所
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage/ut',
  coveragePathIgnorePatterns: [
    '/__tests__/'
  ],
  coverageReporters: [['json'], 'text', 'cobertura'],
  testMatch: ['**/__tests__/unit/**/*.spec.{tsx,ts}'],
}

module.exports = createJestConfig(customJestConfig)
