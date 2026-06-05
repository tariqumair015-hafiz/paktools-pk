// This file is intentionally left as a minimal valid ESM export.
// The real build output will overwrite this file during `npm run build`.
// Do NOT commit the actual build output — Cloudflare Pages builds this automatically.
export default {
  fetch() {
    return new Response("Build output not found. Run npm run build first.", { status: 503 });
  },
};
