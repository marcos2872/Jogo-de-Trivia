/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          100: '#F2F2F2',
          200: '#D9D9D9',
          300: '#808080',
          400: '#333333',
          500: '#262626',
          600: '#1A1A1A',
          700: '#0D0D0D',
        },
        purple: {
          300: '#8284FA',
          500: '#5E60CE',
        },
        blue: {
          100: '#90E0EF',
          200: '#34B3F1',
          300: '#4EA8DE',
          500: '#1E6F9F',
          700: '#001E6C',
        },
        red: {
          500: '#E25858',
        },
        yellow: {
          200: '#F1E9C9',
          300: '#C47F17',
        },

      },
    },
  },
  plugins: [],
};
