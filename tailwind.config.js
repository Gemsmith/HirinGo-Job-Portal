const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      xxs: '320px',
      ...defaultTheme.screens,
      // => @media (min-width: 320px) { ... }

      xs: '480px',
      ...defaultTheme.screens,
      // => @media (min-width: 480px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
