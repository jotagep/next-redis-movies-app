import { expect, test } from '@playwright/test'

import { mockMoviesList } from '@/mocks/movies'

const fulfillJson = (route: any, body: unknown, status = 200) =>
  route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })

test('popular page loads grid with movies', async ({ page }) => {
  await page.route('**/3/movie/popular**', async (route) => {
    fulfillJson(route, { results: mockMoviesList })
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Popular Movies/i })).toBeVisible()
  await expect(page.getByText('Barbie')).toBeVisible()
})
