'use strict'

// https://github.com/istanbuljs/nyc#readme
module.exports = {
  extends: "@istanbuljs/nyc-config-typescript",
  all: true,
  exclude: [
    'coverage/*',
    '__tests__/*',
    '.next/*',
    '*.js',
    '*.d.ts',
    '*.config.ts',
  ],
  reporter: ['text', 'json', 'cobertura'],
}
