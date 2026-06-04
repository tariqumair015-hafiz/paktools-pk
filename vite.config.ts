import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import cloudflarePlugin from "@cloudflare/vite-plugin";

const plugins = [];
if (process.env.CLOUDFLARE_PLUGIN === "1") {
  plugins.push(cloudflarePlugin());
}

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins,
});
