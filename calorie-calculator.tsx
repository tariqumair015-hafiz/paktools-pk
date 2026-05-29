import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("calorie-calculator")!;
const FAQS = [
  { q: "Which formula is used?", a: "Mifflin-St Jeor BMR × activity factor — the most accurate everyday method." },
  { q: "How to lose weight?", a: "Eat ~500 calories below your TDEE per day to lose ~0.5 kg per week." },
  { q: "How to gain weight?", a: "Add ~300-500 calories above TDEE with strength training." },
  { q: "Are these calories desi-food adjusted?", a: "Calorie needs are the same — what changes is the food. Track roti, rice, ghee carefully." },
];

const ACTIVITY: Record<string, number> = {
  "Sedentary (little exercise)": 1.2,
  "Light (1-3 days/week)": 1.375,
  "Moderate (3-5 days/week)": 1.55,
  "Active (6-7 days/week)": 1.725,
  "Very active (athlete)": 1.9,
};

export const Route = createFileRoute("/calorie-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [age, setAge] = useState("25");
  const [w, setW] = useState("70");
  const [h, setH] = useState("170");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [act, setAct] = useState("Moderate (3-5 days/week)");

  const a = parseFloat(age) || 0;
  const wv = parseFloat(w) || 0;
  const hv = parseFloat(h) || 0;
  // Mifflin-St Jeor
  const bmr = sex === "male" ? 10 * wv + 6.25 * hv - 5 * a + 5 : 10 * wv + 6.25 * hv - 5 * a - 161;
  const tdee = bmr * (ACTIVITY[act] ?? 1.2);

  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter age, weight, height.", "Select gender and activity.", "See BMR and daily calorie needs."]}
      formula={`BMR (Mifflin-St Jeor):
Men:   10×W + 6.25×H − 5×A + 5
Women: 10×W + 6.25×H − 5×A − 161
TDEE = BMR × Activity Factor`}
      description={tool.description + " Use TDEE as your maintenance calories. Eat less for weight loss, more for muscle gain."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Age"><input className={inputCls} type="number" value={age} onChange={(e) => setAge(e.target.value)} /></Field>
        <Field label="Weight (kg)"><input className={inputCls} type="number" value={w} onChange={(e) => setW(e.target.value)} /></Field>
        <Field label="Height (cm)"><input className={inputCls} type="number" value={h} onChange={(e) => setH(e.target.value)} /></Field>
        <Field label="Gender">
          <select className={inputCls} value={sex} onChange={(e) => setSex(e.target.value as any)}>
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </Field>
      </div>
      <Field label="Activity level">
        <select className={inputCls} value={act} onChange={(e) => setAct(e.target.value)}>
          {Object.keys(ACTIVITY).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </Field>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="BMR" value={`${fmtNum(bmr, 0)} kcal`} />
          <Stat label="Maintenance (TDEE)" value={`${fmtNum(tdee, 0)} kcal`} />
          <Stat label="Weight loss" value={`${fmtNum(tdee - 500, 0)} kcal`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
