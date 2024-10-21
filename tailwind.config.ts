import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      // backgroundImage: {
      //   "custom-gradient":
      //     "linear-gradient(176deg, rgba(18,24,27,1) 50%, rgba(32,39,55,1) 100%)",
      // },
    },
  },
  plugins: [],
};
export default config;
