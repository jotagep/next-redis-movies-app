import { expect, test } from '@playwright/test'

import { mockMovieInfo, mockMoviesList } from '@/mocks/movies'

const fulfillJson = (route: any, body: unknown, status = 200) =>
  route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })

test('search shows results and navigates to detail', async ({ page }) => {
  await page.route('**/3/search/movie**', async (route) => {
    fulfillJson(route, { results: mockMoviesList })
  })

  await page.route('**/api/movie**', async (route) => {
    fulfillJson(route, mockMovieInfo)
  })

  await page.goto('/')

  const input = page.locator('input[placeholder="Search a movie..."]')
  await input.focus()
  await input.fill('Oppenheimer')

  await expect(page.getByText(/Oppenheimer/i)).toBeVisible()

  await page.getByRole('link', { name: /Oppenheimer/i }).click()

  await expect(page.getByRole('heading', { level: 2, name: /Oppenheimer/i })).toBeVisible()
})
