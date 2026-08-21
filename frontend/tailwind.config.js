/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B0F14",
        panel: "#111820",
        line: "#1E2833",
        ink: "#E6EDF3",
        muted: "#8B9AAB",
        signal: "#7CFFB2",
        amber: "#FFB454",
      },
      fontFamily: {
        display: ["JetBrains Mono", "monospace"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
