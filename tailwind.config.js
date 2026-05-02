/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f8ff",
          100: "#e0f1fe",
          200: "#bae3fd",
          300: "#7dccfb",
          400: "#38b1f6",
          500: "#0e95e6",
          600: "#0277c4",
          700: "#03609f",
          800: "#075284",
          900: "#0c446d",
          950: "#082b48",
        },
      },
      fontFamily: {
        sans: ["'Source Sans 3'", "'Source Sans Pro'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Source Sans 3'", "'Source Sans Pro'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "slow-pan": "slowPan 30s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowPan: {
          "0%": { transform: "scale(1.05) translateX(0)" },
          "100%": { transform: "scale(1.1) translateX(-2%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
