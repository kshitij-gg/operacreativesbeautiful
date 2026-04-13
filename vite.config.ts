import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // gsap's package.json has "module": "index.js" which may not exist in the
    // public npm version. Remove "module" so Rollup falls back to "main": "dist/gsap.js"
    mainFields: ["browser", "main"],
  },
  optimizeDeps: {
    include: ["gsap", "gsap/ScrollTrigger"],
  },
}));
