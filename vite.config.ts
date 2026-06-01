// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
const config = defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});

// Forcefully inject chunk merging into BOTH client and SSR/Server configurations
if (config.vite) {
  config.vite.build = {
    ...config.vite.build,
    rollupOptions: {
      ...config.vite.build?.rollupOptions,
      output: {
        manualChunks: () => 'main-bundle' // Forcefully bundles everything into one asset
      }
    }
  };
}

export default config;
