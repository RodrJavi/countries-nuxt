/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [],
  theme: {
    screens: {
      md: "376px",
    },

    fontSize: {
      lg: "16px",
    },

    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        dblue: "hsl(209, 23%, 22%)",
        vdblue: "hsl(207, 26%, 17%)",
        edblue: "hsl(200, 15%, 8%)",
        dgray: "hsl(0, 0%, 52%)",
        vlgray: "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
