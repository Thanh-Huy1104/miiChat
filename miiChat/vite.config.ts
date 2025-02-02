import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: process.env.PORT || 10000, // Use Render's dynamic PORT, fallback to 10000 for local dev
    host: "0.0.0.0", // Important for Render to detect the open port
  },
});