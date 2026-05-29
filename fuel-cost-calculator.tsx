import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR, fmtNum } from "@/lib/formulas";

const tool = toolBySlug("fuel-cost-calculator")!;
const FAQS = [
  { q: "What is fuel efficiency?", a: "Kilometres your vehicle travels per litre of fuel. E.g. a Mehran ≈ 14 km/l, a Civic ≈ 12 km/l." },
  { q: "Should I include petrol or diesel price?", a: "Use the price you're actually buying — petrol, hi-octane or diesel." },
  { q: "Round trip or one way?", a: "Enter total distance you'll drive (multiply by 2 for round trip)." },
  { q: "How to save fuel?", a: "Maintain 50-80 km/h, avoid hard acceleration, keep tyre pressure correct, service regularly." },
];

export const Route = createFileRoute("/fuel-cost-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [dist, setDist] = useState("500");
  const [eff, setEff] = useState("12");
  const [price, setPrice] = useState("280");
  const d = parseFloat(dist) || 0;
  const e = parseFloat(eff) || 1;
  const p = parseFloat(price) || 0;
  const litres = d / e;
  const cost = litres * p;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter trip distance in km.", "Enter your vehicle's km/litre.", "Enter petrol price per litre."]}
      formula="Litres = Distance ÷ Efficiency\nCost = Litres × Price"
      description={tool.description + " Useful before a Karachi–Lahore drive, a road trip to the north, or just calculating daily commute cost."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Distance (km)"><input className={inputCls} type="number" value={dist} onChange={(e) => setDist(e.target.value)} /></Field>
        <Field label="Efficiency (km/l)"><input className={inputCls} type="number" value={eff} onChange={(e) => setEff(e.target.value)} /></Field>
        <Field label="Fuel price (PKR/l)"><input className={inputCls} type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Fuel needed" value={`${fmtNum(litres, 2)} litres`} />
          <Stat label="Trip cost" value={fmtPKR(cost)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
