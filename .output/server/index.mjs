export default function handler(request) {
  // Stub handler to satisfy Cloudflare plugin pre-build check.
  // This file will be replaced by the real build output during CI.
  return new Response('Stub response from committed .output server index', { status: 200 });
}
