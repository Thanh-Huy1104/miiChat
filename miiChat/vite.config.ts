import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: process.env.PORT || 10000,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["miichat.onrender.com"],
    cors: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 10000,
    allowedHosts: ["miichat.onrender.com"],
    cors: true,
  },
});