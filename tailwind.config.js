/* eslint-disable no-undef */
// tailwind.config.js
module.exports = {
  purge: [
    "./public/**/*.html",
    "./public/**/*.htm",
    "./public/**/*.css",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.ts",
  ],
  //mode: "jit",
  theme: {},
  variants: {
    scrollbars: ["rounded"],
    extend: {
      divideWidth: ["hover", "focus"],
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      cursor: ["hover", "focus", "disabled"],
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/custom-forms"),
  ],
}
