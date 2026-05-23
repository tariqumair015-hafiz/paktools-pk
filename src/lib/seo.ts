import type { ToolMeta } from "./tools-registry";

interface Faq { q: string; a: string }

export function toolHead(tool: ToolMeta, faqs: Faq[]) {
  const title = `${tool.name} Pakistan 2025 | Free Online Tool — PakTools.pk`;
  const desc = `${tool.description} Free, fast and accurate ${tool.name.toLowerCase()} for Pakistan. No signup required.`;
  const url = `/${tool.slug}`;
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { name: "keywords", content: tool.keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          description: desc,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          url,
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  };
}

export function pageHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title: `${title} — PakTools.pk` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — PakTools.pk` },
      { property: "og:description", content: description },
      { property: "og:url", content: path },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
