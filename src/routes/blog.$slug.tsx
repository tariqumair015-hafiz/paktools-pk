import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/blog";
import { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | undefined>();
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🚀 Correction: Jab bhi slug badle (ya user related article par click kare), page top par scroll ho jaye
    window.scrollTo(0, 0);
    
    setLoading(true); // Naye slug par loading skeleton dobara trigger karne ke liye
    fetchBlogPost(slug).then(p => {
      setPost(p);
      setLoading(false);
    });
    
    fetchBlogPosts().then(all => {
      setRelated(all.filter(x => x.slug !== slug).slice(0, 3));
    });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <div className="h-8 bg-muted animate-pulse rounded mb-4 w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 bg-muted animate-pulse rounded mb-2 w-5/6" />
      </main>
      <Footer />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Article not found!</p>
          <Link to="/blog" className="text-primary mt-4 inline-block">← Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl w-full px-4 py-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{post.title}</h1>
        <p className="text-muted-foreground mb-2">{post.meta_description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-8 pb-6 border-b border-border">
          <span>📅 {new Date(post.published_at).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>📖 {post.word_count} words</span>
        </div>
        <div
          className="prose prose-sm max-w-none text-foreground
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-foreground
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:mb-4 [&_ul]:pl-6 [&_li]:mb-1
            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
            [&_th]:bg-primary/10 [&_th]:p-2 [&_th]:text-left [&_th]:border [&_th]:border-border
            [&_td]:p-2 [&_td]:border [&_td]:border-border
            [&_a]:text-primary [&_a]:underline
            [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Articles</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map(r => (
                <Link key={r.id} to="/blog/$slug" params={{ slug: r.slug }}
                  className="block border border-border rounded-lg p-4 hover:border-primary transition-colors">
                  <p className="text-sm font-medium text-foreground line-clamp-2">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
