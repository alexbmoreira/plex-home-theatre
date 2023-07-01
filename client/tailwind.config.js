/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Arvo', 'serif'],
        'sans': ['Rubik', 'sans-serif']
      },
      colors: {
        'gunmetal': '#253444',
        'powder': '#F3F4F6',
        'amethyst': '#8D62AC',
        'slate': '#666D7F',
        'crimson': '#A31621'
      },
    },
  },
  plugins: [],
}

