/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        premiumBlue: '#1e3a8a',
        premiumGold: '#f59e0b',
        premiumLight: '#f3f4f6',
        premiumDark: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
