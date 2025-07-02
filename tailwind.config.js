/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
   content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
       backgroundImage: {
        'custom-gradient': 'linear-gradient(182deg, rgba(235,234,234,0.932) 0%, rgba(255,255,255,1) 100%)',
      },
    },
  },
  plugins: [],
};
