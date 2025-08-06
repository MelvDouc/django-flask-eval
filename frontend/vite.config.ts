import { defineConfig } from "vite";

export default defineConfig({
  server: {
    allowedHosts: true,
    host: "0.0.0.0"
  },
  resolve: {
    alias: {
      "$": `${import.meta.dirname}/src`
    }
  }
});