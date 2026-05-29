import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("gpa-to-percentage")!;
const FAQS = [
  { q: "What formula is used?", a: "Pakistani universities commonly use: Percentage ≈ (GPA / 4.0) × 100 with grade-band mapping." },
  { q: "Is this exact?", a: "It's an approximation — official transcripts use the university's own band table." },
  { q: "Does HEC have a standard formula?", a: "HEC accepts GPA on a 4.0 scale; conversion to % depends on institution." },
  { q: "Can I convert back?", a: "Yes — use our Percentage Calculator and divide by 25 for a rough GPA." },
];

// Standard Pakistani university band mapping
function gpaToPct(g: number): number {
  if (g >= 4) return 95;
  if (g >= 3.7) return 87;
  if (g >= 3.3) return 82;
  if (g >= 3.0) return 77;
  if (g >= 2.7) return 72;
  if (g >= 2.3) return 67;
  if (g >= 2.0) return 62;
  if (g >= 1.7) return 57;
  if (g >= 1.0) return 52;
  return g * 25; // F to D
}

export const Route = createFileRoute("/gpa-to-percentage")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [gpa, setGpa] = useState("3.5");
  const g = parseFloat(gpa) || 0;
  const pct = gpaToPct(g);
  const linear = (g / 4) * 100;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter your GPA on a 4.0 scale.", "See band-mapped percentage and linear approximation."]}
      formula="Band mapping (HEC-style):\n4.0 → ~95%, 3.7 → 87%, 3.3 → 82%, 3.0 → 77% …\nLinear: (GPA ÷ 4) × 100"
      description={tool.description + " Useful when applying to foreign universities or jobs that require percentage on your CV."}
      faqs={FAQS}
    >
      <Field label="GPA (0 – 4.0)"><input className={inputCls} type="number" step="0.01" value={gpa} onChange={(e) => setGpa(e.target.value)} /></Field>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Percentage (band)" value={`${fmtNum(pct, 1)}%`} />
          <Stat label="Linear estimate" value={`${fmtNum(linear, 1)}%`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
