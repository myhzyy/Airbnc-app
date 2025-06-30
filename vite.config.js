import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ← allows access from your local IP (e.g. 192.168.x.x)
    port: 5173, // optional: set a fixed port if you want
  },
});
