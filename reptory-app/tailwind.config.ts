import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16A34A',
          light: '#22C55E', 
          dark: '#15803D',
        },
        secondary: {
          DEFAULT: '#F5E6D3',
          sand: '#E8D5BC',
          cream: '#FAF6F0',
        },
        accent: {
          gold: '#D4AF37',
          coral: '#FF4757',
          sky: '#3DD9D6',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EDEDED',
          300: '#DEDEDE',
          400: '#CCCCCC',
          500: '#999999',
          600: '#666666',
          700: '#333333',
          800: '#212121',
          900: '#121212',
        },
      },
      fontFamily: {
        sans: ['SUIT', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['SUIT', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config