/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        primary: "#EDEDED",
        secondary: "#9BA39A",
        border: "#333333",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      cursor: {
        none: "none",
      },
    },
  },
  plugins: [],
};
