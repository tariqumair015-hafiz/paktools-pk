import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";

const tool = toolBySlug("random-number-generator")!;
const FAQS = [
  { q: "Is the number truly random?", a: "It uses your browser's cryptographic random generator — suitable for lucky draws and giveaways." },
  { q: "Can I pick multiple numbers?", a: "Click Generate again for each new number." },
  { q: "Are values inclusive?", a: "Yes, both min and max are inclusive." },
  { q: "Use cases?", a: "Lucky draws, social media giveaways, deciding orders, exam question selection." },
];

export const Route = createFileRoute("/random-number-generator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [num, setNum] = useState<number | null>(null);
  const gen = () => {
    const lo = parseInt(min) || 0;
    const hi = parseInt(max) || 0;
    const a = Math.min(lo, hi), b = Math.max(lo, hi);
    setNum(Math.floor(Math.random() * (b - a + 1)) + a);
  };
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter minimum value.", "Enter maximum value.", "Click Generate."]}
      formula="N = floor(random() × (max − min + 1)) + min"
      description={tool.description + " Perfect for social media giveaways, classroom games, deciding who pays the bill, or random subject selection."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Minimum"><input className={inputCls} type="number" value={min} onChange={(e) => setMin(e.target.value)} /></Field>
        <Field label="Maximum"><input className={inputCls} type="number" value={max} onChange={(e) => setMax(e.target.value)} /></Field>
      </div>
      <button onClick={gen} className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-primary-foreground font-medium hover:opacity-90">
        Generate
      </button>
      {num !== null && (
        <Result>
          <Stat label="Your random number" value={<span className="text-4xl">{num}</span>} />
        </Result>
      )}
    </ToolLayout>
  );
}
