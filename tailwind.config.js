/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {

      keyframes: {

        blockMove: {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "0.6"
          },

          "50%": {
            opacity: "0.3"
          },

          "100%": {
            transform: "translateY(-60vh) rotate(360deg)",
            opacity: "0"
          }
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)"
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }

      },

      animation: {

        blockMove: "blockMove 18s linear infinite",

        fadeUp: "fadeUp 0.6s ease-out"

      }

    },

  },
  plugins: [],
}


