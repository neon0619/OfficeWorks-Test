/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      success: {
        500: "#3AA138",
        600: "#297728",
      },
      primary: {
        500: "#7DD3FC",
        600: "#6f265f",
      },
    },
    extend: {},
  },
  plugins: [],
};
