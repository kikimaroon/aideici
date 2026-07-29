import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
          soft: "var(--primary-soft)",
        },
        secondary: "var(--secondary)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: "var(--card)",
        border: "var(--border)",
        surface: "var(--surface)",
      },
    },
  },
  plugins: [],
};

export default config;
