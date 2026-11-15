import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
        },
        care: {
          emerald: "#059669",
          amber: "#d97706",
          rose: "#e11d48",
          indigo: "#4f46e5",
        },
      },
      fontSize: {
        "senior-base": "1.25rem",    // 20px
        "senior-lg": "1.5rem",       // 24px
        "senior-xl": "1.875rem",     // 30px
        "senior-2xl": "2.25rem",     // 36px
        "senior-3xl": "3rem",        // 48px
      },
    },
  },
  plugins: [],
};
export default config;
