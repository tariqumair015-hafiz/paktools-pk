import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [cloudflare({ viteEnvironment: { name: "ssr" } })],
  resolve: {
    alias: {
      "node:stream": "stream-browserify",
    },
  },
  optimizeDeps: {
    exclude: ["@tanstack/router-core"],
  },
  ssr: {
    noExternal: ["@tanstack/router-core", "@tanstack/react-router"],
  },
});
