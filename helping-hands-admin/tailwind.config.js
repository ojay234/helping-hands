/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue_400: "#1F4894",
        blue_800: "#153063",
        gray_200: "#F5F5F5",
        black_400: "#040404",
        red_500: "#FF0202",
        yellow_500: "#FFC107",
        gray_100: "#F5F7FA",
        gray_600: "#818181",
        green_600: "#77B255",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
