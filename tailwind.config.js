/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        background: {
          default: "#F7FBFE",
        },
        paper: {
          default: "#f5f6fa",
        },
        primary: {
          light: "var(--color-primary-light)",
          main: "var(--color-primary-main)",
          dark: "var(--color-primary-dark)",
          contrastText: "var(--color-primary-contrastText)",
          lighter: "var(--color-primary-lighter)",
        },
        secondary: {
          light: "var(--color-secondary-light)",
          main: "var(--color-secondary-main)",
          dark: "var(--color-secondary-dark)",
          contrastText: "var(--color-secondary-contrastText)",
        },
        error: "var(--color-error-main)",

        warning: {
          main: "var(--color-warning-main)",
          contrastText: "var(--color-warning-contrastText)",
        },
        info: {
          main: "var(--color-info-main)",
          contrastText: "var(--color-info-contrastText)",
        },
        googleColors: {
          blue: {
            main: "#4285F4",
            light: "#a0c2f9",
          },
          red: {
            main: "#DB4437",
            light: "#f4c5c1",
          },
          yellow: {
            main: "#F4B400",
            light: "#ffecb6",
          },
          green: {
            main: "#0F9D58",
            light: "#aef7d3",
          },
          purple: {
            main: "#673AB7",
            light: "#d2c3ec",
          },
        },
      },
    },
  },
  plugins: [],
};
