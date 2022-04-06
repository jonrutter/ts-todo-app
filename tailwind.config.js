const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },
    extend: {
      sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
