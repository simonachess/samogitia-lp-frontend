/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-500": "#6d737a",
        "gray-black": "#1b1d1f",
        "primary-50": "#edeff6",
        "gray-700": "#363a3d",
        "primary-500": "#0a61b1",
        "gray-white": "#fff",
        whitesmoke: {
          100: "#eaeaea",
          200: "#e7e9eb",
        },
        gainsboro: "rgba(226, 226, 226, 0.1)",
        "primary-900": "#0f1320",
        gray: "rgba(0, 0, 0, 0.5)",
        slategray: "#576074",
        darkslategray: "#434343",
        lightslategray: "#6e7377",
        "primary-800": "#1e2640",
        "primary-700": "#2c3a61",
        "primary-400": "#6e80b4",
      },
      fontFamily: {},
      borderRadius: {
        "10xs": "3px",
        "3xs": "10px",
        "11xs-5": "1.5px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in-menu": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-scale": "fade-in-scale 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.25s ease-out forwards",
        "fade-in-menu": "fade-in-menu 0.2s ease-out forwards",
        "spin-slow": "spin 1s linear infinite",
      },
      animationDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
      },
    },
    fontSize: {
      base: "16px",
      "5xl": "24px",
      sm: "14px",
      "xs-6": "11.6px",
      "2xs-8": "10.8px",
      "sm-6": "13.6px",
      "mini-5": "14.5px",
      "33xl": "52px",
      lg: "18px",
      xl: "20px",
      "21xl": "40px",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      md: {
        max: "960px",
      },
      sm: {
        max: "420px",
      },
    },
  },

  corePlugins: {
    preflight: false,
  },
};
