import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111512",
          50: "#2A2C2E",
          100: "#1F2123",
          900: "#111512",
        },
        sand: {
          DEFAULT: "#F3EFE4",
          50: "#FDFCFA",
          100: "#F9F7F2",
          200: "#F3EFE4",
          300: "#E8E3D5",
          400: "#D4CFC0",
        },
        teal: {
          DEFAULT: "#16B8A6",
          50: "#E6F9F7",
          100: "#B3EDE6",
          200: "#80E1D5",
          300: "#4DD5C4",
          400: "#16B8A6",
          500: "#0E8A7D",
          600: "#075C54",
        },
        stone: {
          DEFAULT: "#A8AAA3",
        },
        alert: {
          DEFAULT: "#B9382E",
        },
        warning: {
          DEFAULT: "#A46300",
        },
        success: {
          DEFAULT: "#197A55",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Source Serif 4", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        ui: "160ms",
        drawer: "280ms",
        hero: "520ms",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(0.22, 1, 0.36, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
        state: "cubic-bezier(0.2, 0, 0, 1)",
      },
      keyframes: {
        "stroke-progress": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "stroke-progress": "stroke-progress 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-up": "fade-in-up 520ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
