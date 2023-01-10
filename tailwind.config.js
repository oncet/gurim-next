const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      yellow: {
        50: "#fffef6",
        100: "#fef7b9",
        200: "#fff189",
        300: "#ffeb5a",
        400: "#ffe635",
        500: "#e6cc26",
        600: "#b39f1d",
        700: "#807113",
        800: "#4d4407",
        900: "#1a1700",
      },
    },
    extend: {},
  },
  plugins: [],
};
