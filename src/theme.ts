import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export const rtlCache = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const theme = createTheme({
  direction: "rtl",

  palette: {
    primary: { main: "#1976d2", light: "#42a5f5", dark: "#1565c0" },
    secondary: { main: "#dc004e", light: "#ff5983", dark: "#9a0036" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },

  typography: {
    fontFamily: "Yekan-Bakh, Vazirmatn, sans-serif",
    h1: { fontWeight: 600, textAlign: "right" },
    h2: { fontWeight: 600, textAlign: "right" },
    h3: { fontWeight: 600, textAlign: "right" },
    h4: { fontWeight: 600, textAlign: "right" },
    h5: { fontWeight: 600, textAlign: "right" },
    h6: { fontWeight: 600, textAlign: "right" },
    body1: { textAlign: "right" },
    body2: { textAlign: "right" },
    button: { textAlign: "center" },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { textAlign: "right" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          textAlign: "right",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          textAlign: "right",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row-reverse",
      },
    },
    MuiGrid: {
      defaultProps: {
        direction: "row-reverse",
      },
    },
  },
});
