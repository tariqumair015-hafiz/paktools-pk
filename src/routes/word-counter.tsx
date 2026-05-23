import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";

const tool = toolBySlug("word-counter")!;
const FAQS = [
  { q: "How is reading time calculated?", a: "Based on an average reading speed of 200 words per minute." },
  { q: "Does it count Urdu words?", a: "Yes — words are split on spaces, so it works for English and Urdu text." },
  { q: "Is character count with or without spaces?", a: "Both are shown — total characters and characters without spaces." },
  { q: "Useful for what?", a: "Essays, blog posts, social media captions, assignments and Twitter/X character limits." },
];

export const Route = createFileRoute("/word-counter")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = (text.match(/[.!?]+/g) || []).length;
    const readTime = Math.max(1, Math.round(words / 200));
    return { words, chars, charsNoSpace, sentences, readTime };
  }, [text]);

  return (
    <ToolLayout
      tool={tool}
      howTo={["Paste or type your text in the box.", "Stats update in real time as you type."]}
      formula="Reading time = Words ÷ 200 wpm"
      description={tool.description + " Useful for essays, IELTS/CSS writing, social media captions and SEO blog posts."}
      faqs={FAQS}
    >
      <Field label="Your text">
        <textarea
          className={inputCls + " min-h-[200px] py-3 font-mono text-sm"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your essay, blog post or any text here…"
        />
      </Field>
      <Result>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <Stat label="Words" value={stats.words} />
          <Stat label="Characters" value={stats.chars} />
          <Stat label="No spaces" value={stats.charsNoSpace} />
          <Stat label="Sentences" value={stats.sentences} />
          <Stat label="Reading" value={`${stats.readTime} min`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
