// JSON imported from src/data so Vite bundles it (importing from /public is not allowed)
import blogData from "../data/blog-posts.json";

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

// Ab yeh function bina kisi network lag ke direct array return karega
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = blogData as BlogPost[];
    return posts.sort((a: BlogPost, b: BlogPost) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  } catch (error) {
    console.error("Error sorting posts:", error);
    return blogData as BlogPost[];
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!slug) return undefined;
  
  const posts = await fetchBlogPosts();
  const cleanSlug = slug.trim().toLowerCase();
  
  // 🔥 Dheet matching: Agar slug thoda aage peeche bhi ho toh crash nahi karega, match dhoond nikalega
  return posts.find(p => {
    const jsonSlug = p.slug.trim().toLowerCase();
    return jsonSlug === cleanSlug || jsonSlug.includes(cleanSlug) || cleanSlug.includes(jsonSlug);
  });
}
