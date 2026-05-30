import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "property-size-calculator", name: "Property Size Converter Pakistan", description: "Convert property size between Marla, Kanal, Square Feet, Square Yards and Square Meters.", icon: "🏠", category: "finance" as const };

const FAQS = [
  { q: "How many square feet in 1 Marla?", a: "1 Marla = 272.25 square feet (in Pakistan). Some areas use 225 sq ft per Marla." },
  { q: "How many Marla in 1 Kanal?", a: "1 Kanal = 20 Marla = 5,445 square feet." },
  { q: "What is the standard plot size in Pakistan?", a: "Common sizes are 5 Marla (1,361 sq ft), 10 Marla (2,722 sq ft), 1 Kanal (5,445 sq ft)." },
  { q: "How many square yards in 1 Marla?", a: "1 Marla = 30.25 square yards (using 272.25 sq ft standard)." },
];

const CONVERSIONS = { marla: 272.25, kanal: 5445, sqft: 1, sqyd: 9, sqm: 10.764 };

export const Route = createFileRoute("/property-size-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [value, setValue] = useState("10");
  const [from, setFrom] = useState("marla");

  const num = parseFloat(value) || 0;
  const inSqFt = num * CONVERSIONS[from as keyof typeof CONVERSIONS];

  const results = {
    marla: inSqFt / CONVERSIONS.marla,
    kanal: inSqFt / CONVERSIONS.kanal,
    sqft: inSqFt,
    sqyd: inSqFt / CONVERSIONS.sqyd,
    sqm: inSqFt / CONVERSIONS.sqm,
  };

  const labels: Record<string, string> = { marla: "Marla", kanal: "Kanal", sqft: "Square Feet", sqyd: "Square Yards", sqm: "Square Meters" };

  return (
    <ToolLayout tool={tool}
      howTo={["Enter property size.", "Select unit (Marla, Kanal, etc.).", "See conversion in all units instantly."]}
      formula="Base unit: Square Feet. 1 Marla = 272.25 sq ft, 1 Kanal = 20 Marla = 5445 sq ft"
      description="Convert property and plot size between Marla, Kanal, Square Feet, Square Yards and Square Meters. Essential tool for real estate in Pakistan — Karachi, Lahore, Islamabad."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Size">
          <input className={inputCls} type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 10" />
        </Field>
        <Field label="From Unit">
          <select className={inputCls} value={from} onChange={e => setFrom(e.target.value)}>
            {Object.keys(labels).map(k => <option key={k} value={k}>{labels[k]}</option>)}
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(results).filter(([k]) => k !== from).map(([k, v]) => (
            <Stat key={k} label={labels[k]} value={`${fmtNum(v, 3)} ${labels[k]}`} />
          ))}
        </div>
      </Result>
    </ToolLayout>
  );
}
