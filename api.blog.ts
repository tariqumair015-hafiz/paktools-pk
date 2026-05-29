import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/blog")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        // n8n will POST articles here
        const authHeader = request.headers.get("Authorization");
        const secret = "PAKTOOLS_SECRET_2025"; // Change this!

        if (authHeader !== `Bearer ${secret}`) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        }

        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.content || !body.slug) {
          return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        const post = {
          id: Date.now().toString(),
          slug: body.slug,
          title: body.title,
          meta_description: body.meta_description || "",
          content: body.content,
          tags: body.tags || [],
          published_at: new Date().toISOString(),
          word_count: body.word_count || 0,
          keyword: body.keyword || ""
        };

        return new Response(JSON.stringify({ 
          success: true, 
          post,
          url: `https://paktools-pk.tariqumair015.workers.dev/blog/${post.slug}`
        }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      },

      GET: async () => {
        return new Response(JSON.stringify({ 
          status: "PakTools Blog API running!",
          endpoints: {
            "POST /api/blog": "Publish new article (requires Authorization header)",
            "GET /api/blog": "API status"
          }
        }), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
});
