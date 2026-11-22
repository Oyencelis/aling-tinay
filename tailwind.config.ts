import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6EBD9",
        brown: "#3B2314",
        chili: "#D93A25",
        corn: "#F2B705",
        pandan: "#3F7D4E",
        ink: "#1A1210",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
      boxShadow: {
        sticker: "5px 6px 0 0 #1A1210",
        "sticker-sm": "3px 4px 0 0 #1A1210",
        "sticker-cream": "5px 6px 0 0 #F6EBD9",
      },
    },
  },
  plugins: [],
};

export default config;
