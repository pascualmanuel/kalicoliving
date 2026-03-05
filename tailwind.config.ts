import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fellix", "sans-serif"],
        fellix: ["Fellix", "sans-serif"],
        recoleta: ["Recoleta", "serif"],
      },
    },
    colors: {
      white: "#FFF2E2",
      red: "#9F2322",
      black: "#272727",
      brown: "#996A53",
      pink: "#EB9A89",
      transparent: "transparent",
      current: "currentColor",
      grey: "#272727",
      // Mantener algunos colores de Tailwind que puedan ser útiles
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
    },
  },
  plugins: [],
};
export default config;
