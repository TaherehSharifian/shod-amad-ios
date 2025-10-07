import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "SHODAMAD App",
        short_name: "SHODAMAD",
        description: "ریوا سرویس شدآمد",
        id: "./",
        start_url: "./",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        icons: [
          {
            src: "icons/shodamad-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/shodamad-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],

        screenshots: [],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  base: "/shod-amad-ios/",
});
