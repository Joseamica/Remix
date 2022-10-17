/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1280px" }, // 1136 WEB
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" }, // 720 TABLET
      // => @media (max-width: 767px) { ... }

      sm: { max: "500px" }, // 312 MOBILE
      // => @media (max-width: 639px) { ... }
    },

    //20 px margin
    //20 px
    //
    minWidth: {
      "1/4": "25%",
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        "custom-laptop": "repeat(12, 1fr)",
        "custom-mobile": "repeat(4, 1fr)",
      },
      colors: {
        bgWhite: "#000",
        mainTextColor: "#262626",
        redMainColor: "#F54748",
        slighlyGray: "#D6D6D9",
      },
      buttons: {
        largeButton:
          "py-4 px-4 justify-between flex flex-row w-full items-center bg-white shadow-md rounded-2xl text-center",
      },

      maxWidth: {
        "laptop-full": "80rem",
        "tablet-full": "48rem",
        "mobile-full": "31.25rem",
      },

      width: {
        "laptop-full": "80rem",
        "tablet-full": "48rem",
        "mobile-full": "31.25rem",
        laptop: "71rem",
        tablet: "45rem",
        mobile: "31.25rem",
      },
    },
  },
  plugins: [],
};
