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

// Simple JSON-based blog storage — n8n will POST here
// Articles stored in localStorage for demo, real deployment uses KV store
export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return getSamplePosts();
  try {
    const stored = localStorage.getItem("paktools_blog_posts");
    if (stored) {
      const posts = JSON.parse(stored);
      if (posts.length > 0) return posts.sort((a: BlogPost, b: BlogPost) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    }
  } catch {}
  return getSamplePosts();
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find(p => p.slug === slug);
}

export function saveBlogPost(post: BlogPost): void {
  if (typeof window === "undefined") return;
  const posts = getBlogPosts();
  const existing = posts.findIndex(p => p.slug === post.slug);
  if (existing >= 0) posts[existing] = post;
  else posts.unshift(post);
  localStorage.setItem("paktools_blog_posts", JSON.stringify(posts));
}

function getSamplePosts(): BlogPost[] {
  return [
    {
      id: "1",
      slug: "gst-calculator-pakistan-guide",
      title: "GST Calculator Pakistan — How to Calculate 17% GST Online Free",
      meta_description: "Learn how to calculate GST in Pakistan instantly. Use our free online GST calculator for 17% sales tax. Perfect for businesses and students.",
      keyword: "GST calculator Pakistan",
      content: `<h2>What is GST in Pakistan?</h2><p>GST (General Sales Tax) in Pakistan is currently set at <strong>17%</strong> for most goods and services. It is collected by the Federal Board of Revenue (FBR) and applies to manufacturers, importers, and retailers.</p><h2>How to Calculate GST in Pakistan?</h2><p>Calculating GST is simple:</p><ul><li><strong>GST Amount</strong> = Original Price × 17%</li><li><strong>Total Price</strong> = Original Price + GST Amount</li></ul><h2>Example</h2><p>If your product costs <strong>Rs 10,000</strong>:</p><ul><li>GST = 10,000 × 0.17 = <strong>Rs 1,700</strong></li><li>Total = 10,000 + 1,700 = <strong>Rs 11,700</strong></li></ul><h2>Who Needs to Pay GST?</h2><p>In Pakistan, GST is applicable on most goods sold at retail level. Businesses registered with FBR must charge and collect GST from customers.</p><h2>FAQs</h2><h3>What is the current GST rate in Pakistan 2025?</h3><p>The standard GST rate in Pakistan is 17% for 2024-25.</p><h3>Is GST same as Sales Tax?</h3><p>Yes, in Pakistan GST and Sales Tax are often used interchangeably.</p>`,
      tags: ["GST", "Tax", "Pakistan", "Calculator"],
      published_at: new Date().toISOString(),
      word_count: 250
    },
    {
      id: "2", 
      slug: "cgpa-calculator-pakistan-universities",
      title: "CGPA Calculator for Pakistani Universities — 4.0 GPA System",
      meta_description: "Calculate your CGPA easily using our free online calculator. Made for Pakistani universities using 4.0 GPA system. FAST, COMSATS, UET, and more.",
      keyword: "CGPA calculator Pakistan",
      content: `<h2>What is CGPA?</h2><p>CGPA (Cumulative Grade Point Average) is the overall grade point average of all your semesters. Most Pakistani universities use a <strong>4.0 scale</strong>.</p><h2>Pakistani University Grading System</h2><table border="1" style="width:100%;border-collapse:collapse;padding:8px"><tr><th>Grade</th><th>GPA Points</th><th>Percentage</th></tr><tr><td>A</td><td>4.0</td><td>85-100%</td></tr><tr><td>B+</td><td>3.5</td><td>80-84%</td></tr><tr><td>B</td><td>3.0</td><td>70-79%</td></tr><tr><td>C+</td><td>2.5</td><td>65-69%</td></tr><tr><td>C</td><td>2.0</td><td>60-64%</td></tr><tr><td>D</td><td>1.0</td><td>50-59%</td></tr><tr><td>F</td><td>0.0</td><td>Below 50%</td></tr></table><h2>How to Calculate CGPA?</h2><p>CGPA = Sum of (Grade Points × Credit Hours) ÷ Total Credit Hours</p><h2>FAQs</h2><h3>What is a good CGPA in Pakistan?</h3><p>Above 3.0 is considered good. Above 3.5 is excellent.</p><h3>How many credit hours are required?</h3><p>Most Pakistani universities require 130-140 credit hours for graduation.</p>`,
      tags: ["CGPA", "Students", "University", "Pakistan"],
      published_at: new Date(Date.now() - 86400000).toISOString(),
      word_count: 220
    }
  ];
}
