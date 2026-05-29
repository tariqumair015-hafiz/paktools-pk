import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { wapdaBill, fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("electricity-bill-calculator")!;
const FAQS = [
  { q: "Is this exact for my bill?", a: "It's an estimate using approximate WAPDA domestic slabs plus ~20% for taxes & duties. Actual bills vary by region (LESCO, K-Electric, MEPCO etc.)." },
  { q: "What slab am I in?", a: "Slabs depend on units used: 1-100, 101-200, 201-300, 301-400, 401-500, 501-600, 601-700, 700+." },
  { q: "How to reduce my bill?", a: "Use energy-efficient bulbs, AC inverter mode at 26°C, and avoid the high slab (>200 units protected)." },
  { q: "Does this include FPA & TV fee?", a: "It includes an approximate 20% surcharge covering taxes, duties and adjustments." },
];

export const Route = createFileRoute("/electricity-bill-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [units, setUnits] = useState("250");
  const u = parseInt(units) || 0;
  const r = wapdaBill(u);
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter units consumed this month (from your meter or bill).", "See estimated WAPDA bill in PKR."]}
      formula="Energy = Units × Slab Rate\nTotal ≈ Energy × 1.20 (taxes, FPA, duties)"
      description={tool.description + " Approximate rates as per WAPDA/DISCO domestic tariffs. Use it to budget before your bill arrives."}
      faqs={FAQS}
    >
      <Field label="Units consumed"><input className={inputCls} type="number" value={units} onChange={(e) => setUnits(e.target.value)} /></Field>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Slab" value={r.slab} />
          <Stat label="Energy cost" value={fmtPKR(r.energy)} />
          <Stat label="Estimated total" value={fmtPKR(r.total)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
