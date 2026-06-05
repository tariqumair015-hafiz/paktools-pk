import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";

const plugins = [];
if (process.env.CLOUDFLARE_PLUGIN === "1") {
  plugins.push(cloudflare({ viteEnvironment: { name: "ssr" } }));
}

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins,
});
