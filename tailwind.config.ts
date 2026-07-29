import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fafaf8",
        foreground: "#1a1a18",
        primary: {
          DEFAULT: "#e85d3a",
          hover: "#d14a2a",
          foreground: "#ffffff",
          soft: "rgba(232, 93, 58, 0.06)",
        },
        secondary: "#f3f3f0",
        muted: {
          DEFAULT: "#f3f3f0",
          foreground: "#6b6b68",
        },
        card: "#ffffff",
        border: "#e0e0dc",
        surface: "#ffffff",
      },
    },
  },
  plugins: [],
};

export default config;
