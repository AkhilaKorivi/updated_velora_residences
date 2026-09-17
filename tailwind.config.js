/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e0d0b",
        charcoal: "#16140f",
        graphite: "#211f1a",
        smoke: "#f4f0e8",
        ivory: "#faf7f1",
        beige: "#e4dcc9",
        sand: "#cdc3ab",
        gold: "#b3965c",
        "gold-light": "#d3bd8f",
        mist: "#8f8980",
        line: "rgba(244,240,232,0.12)",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        lux: "0.28em",
        wide2: "0.14em",
      },
      maxWidth: {
        lux: "1440px",
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        kenburns: "kenburns 18s ease-in-out infinite alternate",
        "scroll-dot": "scrollDot 2.2s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translateY(0)" },
          "100%": { transform: "scale(1.12) translateY(-2%)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(28px)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(179,150,92,0.45), 0 10px 40px -8px rgba(0,0,0,0.6)",
        lift: "0 24px 60px -20px rgba(0,0,0,0.65)",
      },
    },
  },
  plugins: [],
};