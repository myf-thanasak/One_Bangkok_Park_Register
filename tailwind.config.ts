import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        water: {
          50: "#e6f7ff",
          100: "#b3e6ff",
          200: "#80d4ff",
          300: "#4dc3ff",
          400: "#1ab1ff",
          500: "#0099e6",
          600: "#0077b3",
          700: "#005580",
          800: "#00334d",
          900: "#00111a",
        },
        sunshine: {
          50: "#fff9e6",
          100: "#ffecb3",
          200: "#ffe080",
          300: "#ffd34d",
          400: "#ffc61a",
          500: "#e6ac00",
          600: "#b38600",
          700: "#806000",
          800: "#4d3a00",
          900: "#1a1300",
        },
        splash: {
          pink: "#ff6b9d",
          orange: "#ff8a47",
          green: "#4ecdc4",
          purple: "#a855f7",
        },
      },
      backgroundImage: {
        "gradient-water":
          "linear-gradient(135deg, #0099e6 0%, #4dc3ff 50%, #00c9ff 100%)",
        "gradient-sunset":
          "linear-gradient(135deg, #ff6b9d 0%, #ffc61a 50%, #ff8a47 100%)",
        "gradient-fun":
          "linear-gradient(135deg, #4dc3ff 0%, #4ecdc4 50%, #ffc61a 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
