import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
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
          // Keep Vite's shared dynamic-import helper in a tiny standalone
          // chunk. Otherwise Rollup can attach it to Mermaid's lazy chunk
          // and make that multi-megabyte runtime a preload dependency.
          if (id.includes("vite/preload-helper")) {
            return "preload-vendor";
          }

          if (!id.includes("node_modules")) {
            return;
          }

          // Rollup can expose Windows paths with backslashes. Normalize them
          // before matching package paths so npm and pnpm layouts behave alike.
          const normalizedId = id.toLowerCase().replace(/\\/g, "/");

          // Leave Mermaid to Rolldown's dynamic import graph so its runtime
          // remains attached to the article-only chunk instead of the entry.
          if (normalizedId.includes("mermaid")) {
            return;
          }

          // These packages are pulled only by Mermaid's diagram renderers in
          // the current app. Leaving them in the automatic graph prevents a
          // large dependency bundle from being fetched on the home route.
          const mermaidOnlyDependencyMarkers = [
            "/d3/",
            "/d3@",
            "/d3-",
            "/cytoscape/",
            "/cytoscape@",
            "/dagre",
            "/katex/",
            "/katex@",
            "/roughjs/",
            "/roughjs@",
            "/marked/",
            "/marked@",
            "/dayjs/",
            "/dayjs@",
            "/fastdom/",
            "/fastdom@",
            "/stylis/",
            "/stylis@",
            "/khroma/",
            "/khroma@",
            "/@iconify/",
            "/@upsetjs/",
            "/@braintree/",
            "/es-toolkit/",
            "/es-toolkit@",
            "/ts-dedent/",
            "/ts-dedent@",
          ];
          if (mermaidOnlyDependencyMarkers.some((marker) => normalizedId.includes(marker))) {
            return;
          }

          // Keep the shared sanitizer separate so the on-demand Mermaid
          // runtime cannot pull it into the initial entry chunk.
          if (normalizedId.includes("dompurify")) {
            return "sanitizer-vendor";
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
});
