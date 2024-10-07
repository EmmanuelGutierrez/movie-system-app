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
        background: "var(--background)",
        foreground: "var(--foreground)",
        spacing: {
          "100": "25rem",
          "110": "27.5rem",
          120: "30rem",
          130: "32.5rem",
          140: "35rem",
          150: "37.5rem",
          160: "40rem",
        },
        colors: {
          primary: {
            /* DEFAULT: "#4756a6",
          hard: "#2745F2",
          light: "#4E5A9D",
          dark: "#4C5273", */
            DEFAULT: "#4682B4",
            hard: "#0a7ff5",
            light: "#3d70a3",
            dark: "#3F5a75",
          },
          white: {
            DEFAULT: "#ffffff",
            dark: "#f4f5f7",
          },
          black: {
            DEFAULT: "#000000",
            light: "#383a45",
            dark: "#262626",
          },
          // white: "#ffffff",
          gray: {
            DEFAULT: "#333333",
            dark: "#1A1A1A",
            light: "#d7d7d7",
          },
          danger: {
            DEFAULT: "#dc3545",
            light: "#dc143c",
          },
          success: {
            DEFAULT: "#28a745",
            light: "#2ecc71",
          },
        },
        borderWidth: {
          1: "1px",
          "0.5": "0.5px",
        },
        width: {
          "100": "25rem",
          "110": "27.5rem",
          "120": "30rem",
        },
      },
    },
  },
  plugins: [],
};
export default config;
