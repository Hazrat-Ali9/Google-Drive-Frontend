/* eslint-disable no-undef */
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#F7931E",

          "secondary": "#E72D7A",

          "accent": "#00ffff",

          "neutral": "#ff00ff",

          "base-100": "#ffffff",

          "info": "#0000ff",

          "success": "#34A853",

          "warning": "#00ff00",

          "error": "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
});