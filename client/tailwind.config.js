module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "user-icon": "url('/src/styles/images/person_black_24dp.svg')",
        "lock-icon": "url('/src/styles/images/lock_black_24dp.svg')",
        "mail-icon": "url('/src/styles/images/email_black_24dp.svg')",
        "hero-image": "url('/src/styles/images/hero.png')",
        "search-icon": "url('/src/styles/images/search_black_24dp.svg')",
        "cart-icon": "url('/src/styles/images/shopping_cart_white_24dp.svg')",
        arrBack: "url('/src/styles/images/arrow_back_ios_white_24dp.svg')",
        arrForward: "url('/src/styles/images/arrow_forward_ios_white_24dp.svg')",
      },
      backgroundSize: {
        10: "10%",
        20: "20%",
        30: "30%",
        40: "40%",
        50: "50%",
        60: "60",
        70: "70%",
        80: "80%",
        90: "90%",
        100: "100%",
      },
      boxShadow: {
        "6xl": "0px 0 30px 10px #f0f0f0",
      },
      spacing: {
        128: "32rem",
        184: "38rem",
        352: "44rem",
        boxCont: "38rem",
        prodCont: "30rem",
      },
      transitionProperty: {
        transform: "transform",
        transitionDuration: {
          1: "1s",
        },
      },
    },
  },
  plugins: [],
};
