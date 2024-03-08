import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        purple: "#633CFF",
        purpleHover: "#BEADFF",
        lightPurple: "#EFEBFF",
        darkGrey: "#333333",
        grey: "#737373",
        borders: "#D9D9D9",
        lightGrey: "#FAFAFA",
        white: "#FFFFFF",
        red: "#FF3939"
      },
      fontSize: {
        "heading-m": ["32px", "150%"],
        "heading-s": ["16px", "150%"],
        "body-m": ["16px", "150%"],
        "body-s": ["12px", "150%"]
      },
      dropShadow: {
        input: "0px 0px 3px #633CFF40"
      }
    }
  },
  plugins: []
};
export default config;
