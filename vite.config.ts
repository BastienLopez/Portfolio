import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Ensure correct asset paths on GitHub Pages project site
  // When deployed at bastienlopez.github.io/Portfolio/, assets must be prefixed with /Portfolio/
  base: mode === "production" ? "/Portfolio/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("lucide-react")) {
            return "icons-vendor";
          }

          if (id.includes("@radix-ui")) {
            return "radix-vendor";
          }

          if (id.includes("@tanstack/react-query")) {
            return "query-vendor";
          }

          return "vendor";
        },
      },
    },
  },
}));
