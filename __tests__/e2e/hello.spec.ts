import { expect } from '@playwright/test'
import { test } from '__tests__/e2e/fixtures'

test('hello API', async ({ request, serverUrl }) => {
  const hello = await request.get(`${serverUrl}/api/hello`, {})
  expect(hello.ok()).toBeTruthy()
  expect(await hello.json()).toEqual({
    name: 'John Doe',
  })
})
