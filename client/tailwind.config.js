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
        'roboto-italic': ['Roboto-Italic', 'sans-serif']
      }
    },
  },
  plugins: [],
}