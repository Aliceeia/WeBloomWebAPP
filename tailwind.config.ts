import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bloom: {
          50: "#fdf8f4",
          100: "#faf0e8",
          200: "#f3dcc9",
          300: "#e9c0a2",
          400: "#dd9e73",
          500: "#d4814f",
          600: "#c46a39",
          700: "#a35430",
          800: "#83452d",
          900: "#6a3b27",
        },
        garden: {
          50: "#f4f9f4",
          100: "#e4f0e3",
          200: "#c8e0c7",
          300: "#9ec89d",
          400: "#6eaa6d",
          500: "#4a8c49",
          600: "#386f37",
          700: "#2e592d",
          800: "#274726",
          900: "#203b1f",
        },
        petal: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
        },
        dawn: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
