/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tblue: "#1DA1F2",
        tdarkgray: "#657786",
        tblack: "#14171A"
      },
      fontFamily: {
        satoshi: ["Satoshi"]
      },
      fontSize: {
        xxs: [
          "0.65rem",
          {
            lineHeight: "1rem"
          }
        ],
        xxxs: [
          "0.55rem",
          {
            lineHeight: "1rem"
          }
        ]
      },
      animation: {
        text: "text 4s ease infinite"
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        }
      }
    }
  }
};
