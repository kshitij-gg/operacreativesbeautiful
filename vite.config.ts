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
      // Explicit gsap aliases — fixes Rollup resolution on Vercel production builds
      "gsap/ScrollTrigger": path.resolve(__dirname, "node_modules/gsap/ScrollTrigger.js"),
      "gsap/ScrollToPlugin": path.resolve(__dirname, "node_modules/gsap/ScrollToPlugin.js"),
      "gsap": path.resolve(__dirname, "node_modules/gsap/index.js"),
    },
  },
  optimizeDeps: {
    include: ["gsap", "gsap/ScrollTrigger"],
  },
}));
