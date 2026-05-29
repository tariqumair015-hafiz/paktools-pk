import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("attendance-calculator")!;
const FAQS = [
  { q: "Why 75% attendance?", a: "Most Pakistani universities and colleges require minimum 75% attendance to sit in final exams." },
  { q: "Can I change the target?", a: "Yes — set any target % (some universities require 80% or 85%)." },
  { q: "What if I already have over 75%?", a: "It will show how many classes you can skip while staying above the target." },
  { q: "Does it count holidays?", a: "Only count actual scheduled classes (held + missed), not declared holidays." },
];

export const Route = createFileRoute("/attendance-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [total, setTotal] = useState("40");
  const [att, setAtt] = useState("28");
  const [target, setTarget] = useState("75");
  const t = parseInt(total) || 0;
  const a = parseInt(att) || 0;
  const tg = parseFloat(target) || 75;
  const pct = t ? (a / t) * 100 : 0;
  // classes needed: (a + x) / (t + x) >= tg/100 -> x >= (tg t - 100 a) / (100 - tg)
  const needed = pct >= tg ? 0 : Math.ceil((tg * t - 100 * a) / (100 - tg));
  // classes can skip: (a) / (t + x) >= tg/100 -> x <= (100 a / tg) - t
  const canSkip = pct >= tg ? Math.floor((100 * a) / tg - t) : 0;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter total classes held so far.", "Enter classes you've attended.", "Set your target % (default 75)."]}
      formula="Attendance% = (Attended ÷ Total) × 100\nClasses needed = ⌈(Target × Total − 100 × Attended) ÷ (100 − Target)⌉"
      description={tool.description + " Saves you from getting debarred — used by students at NUST, LUMS, COMSATS, UET, Punjab University and more."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Total classes"><input className={inputCls} type="number" value={total} onChange={(e) => setTotal(e.target.value)} /></Field>
        <Field label="Attended"><input className={inputCls} type="number" value={att} onChange={(e) => setAtt(e.target.value)} /></Field>
        <Field label="Target %"><input className={inputCls} type="number" value={target} onChange={(e) => setTarget(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Current %" value={`${fmtNum(pct, 1)}%`} />
          {needed > 0
            ? <Stat label="Must attend next" value={`${needed} classes`} />
            : <Stat label="Can safely skip" value={`${Math.max(0, canSkip)} classes`} />}
          <Stat label="Status" value={pct >= tg ? "Safe ✓" : "Below target"} />
        </div>
      </Result>
    </ToolLayout>
  );
}
