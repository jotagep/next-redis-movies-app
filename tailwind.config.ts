const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    'pages/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      lead: ['var(--font-bebas-neue)', 'Arial', 'sans-serif'],
      sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        darkgray: '#181818',
        netflix: '#e50914',
      },
      fontSize: {
        sm: '0.875rem',
        base: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        title: '5.5rem',
      },
    },
  },
  variants: {},
  plugins: [],
}
