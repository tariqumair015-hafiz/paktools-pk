import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";
import { fetchBlogPosts } from "@/lib/blog";
import { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => pageHead("Blog", "PakTools.pk blog — guides on Pakistani tax, finance, education and daily life.", "/blog"),
});

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts().then(p => { setPosts(p); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Blog</h1>
          <p className="mt-2 text-muted-foreground">Pakistan ke liye guides — Tax, Finance, Students, Daily Life</p>
        </div>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1,2,3,4].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Articles coming soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(post => (
           {posts.map(post => (
  // 🚀 Sahi Tarika: <Link> use karein aur to + params pass karein
  <Link 
    key={post.id} 
    to="/blog/$slug" 
    params={{ slug: post.slug }}
    className="block border border-border rounded-xl p-6 hover:border-primary hover:bg-accent/30 transition-all"
  >
    <div className="flex flex-wrap gap-2 mb-3">
      {post.tags.slice(0, 3).map(tag => (
        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
      ))}
    </div>
    <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h2>
    <p className="text-sm text-muted-foreground line-clamp-2">{post.meta_description}</p>
    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
      <span>{post.word_count} words</span>
      <span>{new Date(post.published_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
    </div>
  </Link>
))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
