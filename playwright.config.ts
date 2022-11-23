import type { PlaywrightTestConfig } from '@playwright/test'
const config: PlaywrightTestConfig = {
  testMatch: [
    '**/__tests__/e2e/**/*spec.ts',
  ],
  workers: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    locale: 'ja',
    timezoneId: 'Asia/Tokyo',
  },
}
export default config
