/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto-Regular', 'sans-serif'],
        'roboto-medium': ['Roboto-Medium', 'sans-serif'],
        'roboto-black': ['Roboto-Black', 'sans-serif'],
        'roboto-italic': ['Roboto-Italic', 'sans-serif'],
        'roboto-bold': ['Roboto-Bold', 'sans-serif']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'tahiti': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      }
    },
  },
  plugins: [],
}