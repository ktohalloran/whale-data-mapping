/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        header: "30%",
        body: "70%",
        mobileHeader: "35%",
        mobileBody: "65%"
      },
      height: {
        mobileMap: "350px"
      },
      colors: {
        "light-gray": "#606061"
      },
      borderWidth: {
        1: "1px"
      }
    },
  },
  plugins: [],
}

