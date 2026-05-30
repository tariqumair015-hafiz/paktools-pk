export interface BlogPost {
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

// Fetch blog posts from static JSON file
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/data/blog-posts.json');
    if (!res.ok) return getSamplePosts();
    const posts = await res.json();
    return posts.sort((a: BlogPost, b: BlogPost) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  } catch {
    return getSamplePosts();
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchBlogPosts();
  return posts.find(p => p.slug === slug);
}

function getSamplePosts(): BlogPost[] {
  return [
    {
      id: "1",
      slug: "gst-calculator-pakistan-guide-2025",
      title: "GST Calculator Pakistan 2025 — Free Online Tool",
      meta_description: "Calculate GST in Pakistan instantly. Learn how to calculate 17% GST on any amount.",
      keyword: "GST calculator Pakistan",
      content: "<h2>What is GST?</h2><p>GST in Pakistan is 17%. Use our <a href='/gst-calculator'>free GST calculator</a>!</p>",
      tags: ["GST", "Tax", "Pakistan"],
      published_at: new Date().toISOString(),
      word_count: 250
    }
  ];
}
