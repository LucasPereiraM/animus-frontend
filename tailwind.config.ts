import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: "320px" },
      },
      fontFamily: {
        raleway: ["var(--font-raleway)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#07518E",
        secondary: "#155BCB",
        grey: "#E8E8E8",
        bgGrey: "#F2F2F2",
        bannerMain: "#4F4F4F",
      },
    },
  },
  plugins: [],
} satisfies Config;
