import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["var(-font-source-sans-3)", "sans-serif"] },
      margin: {
        main: "21rem",
      },
      width: {
        100: "25rem",
        110: "27.5rem",
        120: "30rem",
        130: "32.5rem",
        140: "35rem",
        150: "37.5rem",
        160: "40rem",
        170: "42.5rem",
        180: "45rem",
        190: "47.5rem",
        200: "50rem",
        210: "52.5rem",
        220: "55rem",
        230: "57.5rem",
        240: "60rem",
        250: "62.5rem",
        260: "65rem",
        270: "67.5rem",
        280: "70rem",
        290: "72.5rem",
        300: "75rem",
        310: "77.5rem",
        320: "80rem",
        330: "82.5rem",
        340: "85rem",
        350: "87.5rem",
        360: "90rem",
        370: "92.5rem",
        380: "95rem",
      },
      maxWidth: {
        100: "25rem",
        110: "27.5rem",
        120: "30rem",
        130: "32.5rem",
        140: "35rem",
        150: "37.5rem",
        160: "40rem",
        170: "42.5rem",
        180: "45rem",
        190: "47.5rem",
        200: "50rem",
        210: "52.5rem",
        220: "55rem",
        230: "57.5rem",
        240: "60rem",
        250: "62.5rem",
        260: "65rem",
        270: "67.5rem",
        280: "70rem",
        290: "72.5rem",
        300: "75rem",
        310: "77.5rem",
        320: "80rem",
        330: "82.5rem",
        340: "85rem",
        350: "87.5rem",
        360: "90rem",
        370: "92.5rem",
        380: "95rem",
      },
      height: {
        100: "25rem",
        110: "27.5rem",
        120: "30rem",
        130: "32.5rem",
        140: "35rem",
        150: "37.5rem",
        160: "40rem",
        170: "42.5rem",
        180: "45rem",
        190: "47.5rem",
        200: "50rem",
        210: "52.5rem",
        220: "55rem",
        230: "57.5rem",
        240: "60rem",
        250: "62.5rem",
        260: "65rem",
        270: "67.5rem",
        280: "70rem",
        290: "72.5rem",
        300: "75rem",
        310: "77.5rem",
        320: "80rem",
        330: "82.5rem",
        340: "85rem",
        350: "87.5rem",
        360: "90rem",
        370: "92.5rem",
        380: "95rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        spacing: {
          100: "25rem",
          110: "27.5rem",
          120: "30rem",
          130: "32.5rem",
          140: "35rem",
          150: "37.5rem",
          160: "40rem",
          170: "42.5rem",
          180: "45rem",
          190: "47.5rem",
          200: "50rem",
          210: "52.5rem",
          220: "55rem",
          230: "57.5rem",
          240: "60rem",
          250: "62.5rem",
          260: "65rem",
          270: "67.5rem",
          280: "70rem",
          290: "72.5rem",
          300: "75rem",
          310: "77.5rem",
          320: "80rem",
          330: "82.5rem",
          340: "85rem",
          350: "87.5rem",
          360: "90rem",
          370: "92.5rem",
          380: "95rem",
        },
        colors: {
          primary: {
            /* DEFAULT: "#4756a6",
          hard: "#2745F2",
          light: "#4E5A9D",
          dark: "#4C5273", */
            // DEFAULT: "#4682B4",
            // hard: "#0a7ff5",
            // light: "#3d70a3",
            // dark: "#001232",
            // clear: "#4AE0F7",
            DEFAULT: "#006dac",
            hard: "#00458b",
            light: "#0095bc",
            dark: "#0a1e5e",
            clear: "#00bcbd",
          },
          secondary: {
            DEFAULT: "#5250a5",
            hard: "#75296f",
            light: "#ab5ca3",
            clear: "#6103b6",
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
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      console.log("THEME");
      const scrollbarUtilities = {
        // Scrollbar Moderno
        ".scrollbar-modern": {
          "&::-webkit-scrollbar": {
            width: "15px",
            height: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#262626",
            border: "3px #262626 solid ",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#006dac",
            border: "3px #262626 solid ",
            "border-radius": "15px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "linear-gradient(180deg, #2563eb, #1e40af)",
          },
          "&::-webkit-scrollbar-corner": {
            background: "#f1f5f9",
          },
          "&::-webkit-scrollbar-button:single-button": {
            display: "none",
          },
          // Firefox
          /* 
          .scrollbar-custom::-webkit-scrollbar-button:vertical:start:increment,
.scrollbar-custom::-webkit-scrollbar-button:vertical:end:decrement,
.scrollbar-custom::-webkit-scrollbar-button:horizontal:start:increment,
.scrollbar-custom::-webkit-scrollbar-button:horizontal:end:decrement {
  display: none;
}
          */

          // scrollbarColor: "#3b82f6 transparent",
        },

        // Scrollbar Minimal
        ".scrollbar-minimal": {
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e1",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
          // Firefox

          scrollbarColor: "#3b82f6 transparent",
        },

        // Scrollbar Dark
        ".scrollbar-dark": {
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#1f2937",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#4b5563",
            borderRadius: "10px",
            border: "2px solid #1f2937",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#6b7280",
          },
          "&::-webkit-scrollbar-corner": {
            background: "#1f2937",
          },
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
          // Firefox

          scrollbarColor: "#4b5563 #1f2937",
        },

        // Scrollbar Gradient
        ".scrollbar-gradient": {
          "&::-webkit-scrollbar": {
            width: "12px",
            height: "12px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f8fafc",
            borderRadius: "15px",
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)",
            borderRadius: "15px",
            border: "2px solid #f8fafc",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "linear-gradient(45deg, #ff5252, #26a69a, #2196f3)",
          },
          "&::-webkit-scrollbar-corner": {
            background: "#f8fafc",
          },
          // Firefox

          scrollbarColor: "#ff6b6b #f8fafc",
        },

        // Scrollbar Hidden (útil para ocultar scrollbars)
        ".scrollbar-hidden": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },

        // Scrollbar Auto (solo aparece cuando es necesario)
        ".scrollbar-auto": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0.2)",
            borderRadius: "4px",
            transition: "background 0.3s ease",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            background: "rgba(0,0,0,0.4)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(0,0,0,0.6)",
          },
          // Firefox

          scrollbarColor: "rgba(0,0,0,0.2) transparent",
        },
      };

      addUtilities(scrollbarUtilities);
    }),

    // Plugin adicional para variantes de tamaño
    plugin(({ addUtilities }) => {
      const scrollbarSizes = {
        ".scrollbar-thin": {
          "&::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
          },
        },
        ".scrollbar-normal": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
        },
        ".scrollbar-thick": {
          "&::-webkit-scrollbar": {
            width: "16px",
            height: "16px",
          },
        },
      };

      addUtilities(scrollbarSizes);
    }),
  ],
};
export default config;
