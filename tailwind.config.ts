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
          200: "#bae6fd",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
        },
        blossom: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f472b6",
          400: "#ec4899",
          500: "#db2777",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.72)",
          border: "rgba(255, 255, 255, 0.55)",
          shadow: "0 8px 32px 0 rgba(148, 163, 184, 0.12)",
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
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-reverse": "floatReverse 10s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-14px) scale(1.03)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(16px) scale(0.97)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
