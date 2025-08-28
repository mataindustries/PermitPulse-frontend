import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const WORKER = "https://permitpulse-worker.matasergio741.workers.dev";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/health": { target: WORKER, changeOrigin: true },
      "/weho": { target: WORKER, changeOrigin: true },
      "/beverlyhills": { target: WORKER, changeOrigin: true },
      "/altadena": { target: WORKER, changeOrigin: true },
      "/palisades": { target: WORKER, changeOrigin: true },
      "/combined": { target: WORKER, changeOrigin: true },
      "/subscribe": { target: WORKER, changeOrigin: true },
      "/waitlist": { target: WORKER, changeOrigin: true },
      "/cpra": { target: WORKER, changeOrigin: true },
    },
  },
});
