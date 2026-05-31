import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import blogData from "../../public/data/blog-posts.json";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  content: string;
  tags: string[];
  published_at: string;
  word_count: number;
  keyword: string;
}

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => pageHead("Blog", "PakTools.pk blog — guides on Pakistani tax, finance, education and daily life.", "/blog"),
});

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sorted = [...blogData].sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
    setPosts(sorted as BlogPost[]);
    setLoading(false);

    // 🚀 Query Parameter bypass logic
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const postParam = urlParams.get("post");
      if (postParam) {
        const found = sorted.find((p) => p.slug.trim().toLowerCase() === postParam.trim().toLowerCase());
        if (found) setActivePost(found as BlogPost);
      }
    }
  }, []);

  const handleCardClick = (post: BlogPost) => {
    setActivePost(post);
    if (typeof window !== "undefined") {
      // Yeh line URL ko badal kar /blog?post=slug kar degi jo router ko crash nahi karta
      window.history.pushState({}, "", `/blog?post=${post.slug}`);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setActivePost(null);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/blog");
      window.scrollTo(0, 0);
    }
  };

  // --- SINGLE ARTICLE VIEW ---
  if (activePost) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="mx-auto max-w-3xl w-full px-4 py-10 flex-1">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </button>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {activePost.tags.map(tag => (
              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{activePost.title}</h1>
          <p className="text-muted-foreground mb-4">{activePost.meta_description}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8 pb-6 border-b border-border">
            <span>📅 {new Date(activePost.published_at).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>📖 {activePost.word_count} words</span>
          </div>

          <div
            className="prose prose-sm max-w-none text-foreground
              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-foreground
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:mb-4 [&_p]:leading-relaxed
              [&_ul]:mb-4 [&_ul]:pl-6 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: activePost.content }}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // --- ALL CARDS LIST ---
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-4xl w-full px-4 py-12 flex-1">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Blog</h1>
          <p className="mt-2 text-muted-foreground">Pakistan ke liye guides — Tax, Finance, Students, Daily Life</p>
        </div>
        
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Articles coming soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(post => (
              <div 
                key={post.id} 
                onClick={() => handleCardClick(post)}
                className="block border border-border rounded-xl p-6 hover:border-primary hover:bg-accent/30 transition-all cursor-pointer"
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
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
