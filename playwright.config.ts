import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run dev',
    env: {
      NEXT_PUBLIC_MOVIES_API_KEY: 'test_key',
      NEXT_PUBLIC_API_URL: 'http://localhost:3000/api'
    },
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000
  }
})
