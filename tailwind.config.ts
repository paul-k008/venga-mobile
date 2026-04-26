import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "cream-2": "var(--cream-2)",
        "cream-3": "var(--cream-3)",
        ink: "var(--ink)",
        "ink-70": "rgba(14,17,22,0.70)",
        "ink-40": "rgba(14,17,22,0.40)",
        hair: "rgba(14,17,22,0.08)",
        orange: "var(--orange)",
        "orange-deep": "var(--orange-deep)",
        "orange-soft": "var(--orange-soft)",
        mint: "var(--mint)",
        "mint-deep": "var(--mint-deep)",
        red: "var(--red)",
        "red-tint": "rgba(229,57,53,0.10)",
        sky: "var(--sky)",
        yellow: "var(--yellow)",
        lime: "var(--lime)",
        "blob-blue": "var(--blob-blue)",
        "blob-mint": "var(--blob-mint)",
        "blob-yellow": "var(--blob-yellow)",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        pill: "9999px",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-geist-sans)", "sans-serif"],
        nums: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        mobile: "440px",
      },
    },
  },
  plugins: [],
};

export default config;
