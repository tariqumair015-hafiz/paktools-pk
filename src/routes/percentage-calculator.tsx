import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("percentage-calculator")!;
const FAQS = [
  { q: "How is percentage calculated?", a: "Percentage = (Obtained ÷ Total) × 100" },
  { q: "What grades correspond to which percentage?", a: "A+ ≥ 80%, A 70-79%, B 60-69%, C 50-59%, D 40-49%, F < 40% (varies by board)." },
  { q: "Can I use this for matric or FSc?", a: "Yes — works for any exam where you know total and obtained marks." },
  { q: "Is this for BISE boards?", a: "Yes, standard percentage formula used by all Pakistani boards." },
];

const grade = (p: number) => p >= 80 ? "A+" : p >= 70 ? "A" : p >= 60 ? "B" : p >= 50 ? "C" : p >= 40 ? "D" : "F";

export const Route = createFileRoute("/percentage-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [obt, setObt] = useState("850");
  const [tot, setTot] = useState("1100");
  const o = parseFloat(obt) || 0;
  const t = parseFloat(tot) || 1;
  const pct = (o / t) * 100;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter marks obtained.", "Enter total marks.", "See percentage and grade."]}
      formula="Percentage = (Obtained ÷ Total) × 100"
      description={tool.description + " Use this after BISE matric/intermediate results, university exams or any test."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Marks obtained"><input className={inputCls} type="number" value={obt} onChange={(e) => setObt(e.target.value)} /></Field>
        <Field label="Total marks"><input className={inputCls} type="number" value={tot} onChange={(e) => setTot(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Percentage" value={`${fmtNum(pct, 2)}%`} />
          <Stat label="Grade" value={grade(pct)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
