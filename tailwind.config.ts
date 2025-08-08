// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#fafafa",
        background: "#0d0c1d", // mantengo tu fondo actual
        primary: "#ff1a1a", // rojo acento brutal
        electric: "#246BFD", // azul eléctrico alternativo
        muted: "#ffffff33",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"], // ya la tienes
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "6px 6px 0 0 #000",
        brutalSm: "3px 3px 0 0 #000",
      },
      fontSize: {
        display: "clamp(3rem, 6vw, 6rem)",
        deck: "clamp(1.125rem, 2vw, 1.75rem)",
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};

export default config;
