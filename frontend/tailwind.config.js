/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        header: "30%",
        body: "70%"
      },
      colors: {
        "light-gray": "#606061"
      }
    },
  },
  plugins: [],
}

