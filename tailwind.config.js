/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs'],
  theme: {
  extend: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
    },
    animation: {
      fade: 'fadeIn 0.5s ease-in-out'
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
  },
  },
  plugins: [
  {
  tailwindcss: {},
  autoprefixer: {},
  },
  ],
  };