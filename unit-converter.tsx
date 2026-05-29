import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("unit-converter")!;
const FAQS = [
  { q: "Which units are supported?", a: "Length (km↔miles, m↔ft), Weight (kg↔lbs), Temperature (°C↔°F)." },
  { q: "How accurate is it?", a: "Uses internationally standard conversion factors with full floating-point precision." },
  { q: "Can I convert temperature below zero?", a: "Yes — works for any temperature value." },
  { q: "Why are there different unit systems?", a: "Pakistan uses metric (km, kg, °C). UK/US uses imperial (miles, lbs, °F)." },
];

type Type = "length" | "weight" | "temp";

function convert(t: Type, v: number, from: string, to: string): number {
  if (from === to) return v;
  if (t === "length") {
    const meters = from === "km" ? v * 1000 : from === "mi" ? v * 1609.344 : from === "ft" ? v * 0.3048 : v;
    return to === "km" ? meters / 1000 : to === "mi" ? meters / 1609.344 : to === "ft" ? meters / 0.3048 : meters;
  }
  if (t === "weight") {
    const kg = from === "kg" ? v : v * 0.453592;
    return to === "kg" ? kg : kg / 0.453592;
  }
  // temp
  const c = from === "C" ? v : (v - 32) * 5 / 9;
  return to === "C" ? c : c * 9 / 5 + 32;
}

const UNITS: Record<Type, string[]> = {
  length: ["km", "mi", "m", "ft"],
  weight: ["kg", "lb"],
  temp: ["C", "F"],
};

export const Route = createFileRoute("/unit-converter")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [type, setType] = useState<Type>("length");
  const [from, setFrom] = useState("km");
  const [to, setTo] = useState("mi");
  const [val, setVal] = useState("100");

  const setT = (t: Type) => { setType(t); setFrom(UNITS[t][0]); setTo(UNITS[t][1]); };
  const v = parseFloat(val) || 0;
  const result = convert(type, v, from, to);

  return (
    <ToolLayout
      tool={tool}
      howTo={["Pick a category (length, weight, temperature).", "Choose from and to units.", "Enter value to convert."]}
      formula="km → mi: × 0.6214\nkg → lb: × 2.2046\n°C → °F: × 9/5 + 32"
      description={tool.description + " Useful for converting fuel mileage, weight on global recipes, oven temperatures and international shipping."}
      faqs={FAQS}
    >
      <div className="flex gap-2 mb-4">
        {(["length", "weight", "temp"] as Type[]).map((t) => (
          <button key={t} onClick={() => setT(t)} className={`px-3 py-1.5 rounded-md text-sm border ${type === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:bg-accent"}`}>
            {t === "length" ? "Length" : t === "weight" ? "Weight" : "Temperature"}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Value"><input className={inputCls} type="number" value={val} onChange={(e) => setVal(e.target.value)} /></Field>
        <Field label="From">
          <select className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)}>
            {UNITS[type].map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </Field>
        <Field label="To">
          <select className={inputCls} value={to} onChange={(e) => setTo(e.target.value)}>
            {UNITS[type].map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </Field>
      </div>
      <Result>
        <Stat label="Result" value={`${fmtNum(result, 4)} ${to}`} />
      </Result>
    </ToolLayout>
  );
}
