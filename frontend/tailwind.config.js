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
      }
    },
  },
  plugins: [],
}

