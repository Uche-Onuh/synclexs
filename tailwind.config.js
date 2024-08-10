/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00DDFF",
        secondary: "#F6EDDF",
        tertiary: "#000C0E",
        alternate: "#05363D",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        loginbg: "url('/src/assets/loginbg.png')",
        signbg: "url('/src/assets/signbg.png')",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
