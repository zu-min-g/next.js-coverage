import { expect } from '@playwright/test'
import { test } from '__tests__/e2e/fixtures'

test('server-props alt 0', async ({ page, serverUrl }) => {
  await page.goto(`${serverUrl}/server-props`, {
    waitUntil: 'load',
  })
  await expect(page.getByTestId('type')).toHaveText('ServerSide')
})

test('server-props alt 1', async ({ page, serverUrl }) => {
  await page.goto(`${serverUrl}/server-props?alt=1`, {
    waitUntil: 'load',
  })
  await expect(page.getByTestId('message')).toHaveText('ブランチ')
})
