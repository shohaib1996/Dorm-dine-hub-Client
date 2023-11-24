/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer': "url('https://wedesignthemes.com/html/bella/skins/palebrown/images/top-bg.jpg')",
        "footer-top": "url('https://wedesignthemes.com/html/bella/skins/palebrown/images/footer-top-bg.png')"

      },
      fontFamily: {
        'lobster': ['Lobster', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")],
}

