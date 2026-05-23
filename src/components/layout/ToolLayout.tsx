import { Link } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { Share2, Check, ChevronRight } from "lucide-react";
import { AdSlot, MobileStickyAd } from "./AdSlot";
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { ToolMeta } from "@/lib/tools-registry";
import { relatedTools, categories } from "@/lib/tools-registry";

interface Props {
  tool: ToolMeta;
  children: ReactNode;
  howTo: string[];
  formula: string;
  description: string;
  faqs: { q: string; a: string }[];
}

export function ToolLayout({ tool, children, howTo, formula, description, faqs }: Props) {
  const Icon = tool.icon;
  const related = relatedTools(tool.slug, 3);
  const cat = categories[tool.category];
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `/${tool.slug}`;
    const title = `${tool.name} Pakistan 2025 — PakTools.pk`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try { await (navigator as any).share({ title, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <Header />
      <AdSlot variant="header" />
      <main className="mx-auto w-full max-w-7xl px-4 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-3 flex items-center flex-wrap gap-1" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <a href={cat.href} className="hover:text-primary">{cat.label}</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{tool.name}</span>
          </nav>

          <div className="flex items-start gap-4 mb-2">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-sm">
              <Icon className="h-7 w-7" />
            </span>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {tool.name} Pakistan 2025 — Free Online Tool
              </h1>
              <p className="text-muted-foreground mt-1">{tool.short}</p>
            </div>
            <button
              onClick={share}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition"
              aria-label="Share this tool"
            >
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Copied!" : "Share"}
            </button>
          </div>

          <section className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            {children}
          </section>

          <AdSlot variant="below" />

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">How to use</h2>
            <ol className="list-decimal pl-5 space-y-1 text-foreground/90">
              {howTo.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">Formula used</h2>
            <p className="rounded-lg bg-muted px-4 py-3 text-sm font-mono text-foreground/90 whitespace-pre-wrap">{formula}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">About this tool</h2>
            <p className="text-foreground/85 leading-relaxed">{description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="rounded-lg border border-border bg-card p-4 group">
                  <summary className="cursor-pointer font-medium text-foreground">{f.q}</summary>
                  <p className="mt-2 text-sm text-foreground/80">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground mb-3">Related tools</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {related.map((r) => {
                const RI = r.icon;
                return (
                  <Link
                    key={r.slug}
                    to={"/$slug" as any}
                    params={{ slug: r.slug } as any}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-primary hover:-translate-y-0.5 transition"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <RI className="h-4 w-4" />
                    </span>
                    <div className="text-sm">
                      <div className="font-medium text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.short}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <AdSlot variant="sidebar" />
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm font-semibold text-foreground mb-2">More from PakTools</div>
              <ul className="space-y-2 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={"/$slug" as any} params={{ slug: r.slug } as any} className="text-muted-foreground hover:text-primary">
                      → {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
      <MobileStickyAd />
    </div>
  );
}
