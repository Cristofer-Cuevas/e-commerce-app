module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "user-icon": "url('/src/styles/images/person_black_24dp.svg')",
        "lock-icon": "url('/src/styles/images/lock_black_24dp.svg')",
        "mail-icon": "url('/src/styles/images/email_black_24dp.svg')",
      },
    },
  },
  plugins: [],
};
