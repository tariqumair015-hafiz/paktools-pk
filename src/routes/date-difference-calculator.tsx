import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("date-difference-calculator")!;
const FAQS = [
  { q: "Does it count both start and end dates?", a: "It counts the number of days between dates (end − start)." },
  { q: "Can I use it for project deadlines?", a: "Yes — perfect for planning assignments, project timelines and event countdowns." },
  { q: "Does it work for past dates?", a: "Yes — works in either direction." },
  { q: "How many months between two dates?", a: "Approximate months = days ÷ 30.44 (average month length)." },
];

export const Route = createFileRoute("/date-difference-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-12-31");
  const ms = new Date(to).getTime() - new Date(from).getTime();
  const days = Math.round(Math.abs(ms) / 86400000);
  return (
    <ToolLayout
      tool={tool}
      howTo={["Pick the start date.", "Pick the end date.", "See days, weeks and months between them."]}
      formula="Days = |End − Start| ÷ (1 day in ms)"
      description={tool.description + " Use it for academic deadlines, wedding planning, visa expiry tracking, or any countdown."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="From date"><input className={inputCls} type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></Field>
        <Field label="To date"><input className={inputCls} type="date" value={to} onChange={(e) => setTo(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Days" value={days} />
          <Stat label="Weeks" value={fmtNum(days / 7, 1)} />
          <Stat label="Months" value={fmtNum(days / 30.44, 1)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
