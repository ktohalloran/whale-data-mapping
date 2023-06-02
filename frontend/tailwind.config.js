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
        mobileHeader: "35%"
      },
      height: {
        mobileMap: "400px"
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

