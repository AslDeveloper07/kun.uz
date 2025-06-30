/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-green': '7px 8px 0px 2px rgba(13, 73, 0, 0.75)',
      },
    },
  },
  plugins: [],
};
