import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import cloudflarePlugin from "@cloudflare/vite-plugin";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [
    cloudflarePlugin(),
  ],
});
