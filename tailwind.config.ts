import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export const config: Config = {
  content: [
    'pages/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'features/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      lead: ['var(--font-bebas-neue)', 'Arial', 'sans-serif'],
      sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        darkgray: '#181818',
        netflix: '#e50914'
      },
      fontSize: {
        title: '4.5rem'
      }
    }
  },
  variants: {},
  plugins: []
}

export default config
