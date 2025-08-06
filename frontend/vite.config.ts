import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,  // Use polling instead of native file events
      interval: 1000     // Poll every 1 second
    }
  },
  resolve: {
    alias: {
      "$": `${import.meta.dirname}/src`
    }
  },
  optimizeDeps: {
    exclude: [
      "reactfree-jsx",
      "reactfree-jsx/jsx-dev-runtime",
      "reactfree-jsx/jsx-runtime",
      "reactfree-jsx/extra"
    ]
  }
});