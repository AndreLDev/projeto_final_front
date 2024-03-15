// tailwind.config.js
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f9fafb",
          text: "#111827",
          primary: "#3b82f6",
          icon: "#6b7280",
          success: "#22c55e",
          danger: "#ef4444",
          warning: "#f59e0b",
          info: "#4f46e5",
        },
        dark: {
          background: "#1f2937",
          text: "#f3f4f6",
          primary: "#7c3aed",
          icon: "#9ca3af",
          success: "#34d399",
          danger: "#f87171",
          warning: "#fbbf24",
          info: "#818cf8",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
  })],
};

export default config;
