import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("bmi-calculator")!;
const FAQS = [
  { q: "What is a healthy BMI?", a: "18.5 – 24.9 is considered normal. Above 25 is overweight, above 30 is obese." },
  { q: "Is BMI accurate for athletes?", a: "BMI doesn't differentiate muscle from fat — athletes may show high BMI without being unhealthy." },
  { q: "Is BMI the same for South Asians?", a: "WHO suggests slightly lower cut-offs for South Asians: overweight at BMI ≥ 23." },
  { q: "How can I lower my BMI?", a: "Reduce calorie intake, increase activity, and consult a nutritionist for a structured plan." },
];

const cat = (b: number) => b < 18.5 ? "Underweight" : b < 25 ? "Normal" : b < 30 ? "Overweight" : "Obese";

export const Route = createFileRoute("/bmi-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [w, setW] = useState("70");
  const [h, setH] = useState("170");
  const wv = parseFloat(w) || 0;
  const hv = (parseFloat(h) || 0) / 100;
  const bmi = hv ? wv / (hv * hv) : 0;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter weight in kg.", "Enter height in cm.", "See your BMI and category."]}
      formula="BMI = Weight(kg) ÷ Height(m)²"
      description={tool.description + " A quick screening tool — not a substitute for a doctor's assessment, especially for athletes or pregnant women."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Weight (kg)"><input className={inputCls} type="number" value={w} onChange={(e) => setW(e.target.value)} /></Field>
        <Field label="Height (cm)"><input className={inputCls} type="number" value={h} onChange={(e) => setH(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="BMI" value={fmtNum(bmi, 1)} />
          <Stat label="Category" value={cat(bmi)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
