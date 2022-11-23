import { expect } from '@playwright/test'
import { test } from '__tests__/e2e/fixtures'

test('static-props alt 0', async ({ page, serverUrl }) => {
  await page.goto(`${serverUrl}/static-props`, {
    waitUntil: 'load',
  })
  await expect(page.getByTestId('type')).toHaveText('Static')
  await expect(page.getByTestId('message')).not.toHaveText('ブランチ')
})

test('static-props alt 1', async ({ page, serverUrl }) => {
  await page.goto(`${serverUrl}/static-props?alt=1`, {
    waitUntil: 'load',
  })
  await expect(page.getByTestId('message')).toHaveText('ブランチ')
})
