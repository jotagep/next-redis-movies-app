import { expect, test } from '@playwright/test'

import { mockMovieDetailed } from '@/mocks/movies'

import { STORAGE_FAVORITES_KEY } from '@/config/constants'

test('favorites page shows grid when localStorage has a favorite', async ({ page }) => {
  await page.addInitScript(
    ({ key, movie }) => {
      const payload = { movies: { [movie.id]: movie } }
      window.localStorage.setItem(key, JSON.stringify(payload))
    },
    { key: STORAGE_FAVORITES_KEY, movie: mockMovieDetailed }
  )

  await page.goto('/favorites')

  await expect(page.getByRole('heading', { name: /Favorite Movies/i })).toBeVisible()

  await expect(page.getByText(new RegExp(mockMovieDetailed.title, 'i'))).toBeVisible()
})

test('favorites page shows empty state when localStorage empty', async ({ page }) => {
  await page.addInitScript(
    ({ key }) => {
      window.localStorage.setItem(key, JSON.stringify({ movies: {} }))
    },
    { key: STORAGE_FAVORITES_KEY }
  )

  await page.goto('/favorites')

  await expect(page.getByText(/You have not favorite movies yet/i)).toBeVisible()
})
