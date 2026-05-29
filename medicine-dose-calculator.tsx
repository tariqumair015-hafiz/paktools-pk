import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "medicine-dose-calculator", name: "Medicine Dose Calculator", description: "Calculate correct medicine dose based on weight and age. Common medications for children and adults.", icon: "💊", category: "daily" as const };

const FAQS = [
  { q: "How is medicine dose calculated by weight?", a: "Most medicines are dosed as mg per kg of body weight. For example, Paracetamol is 10-15 mg/kg per dose." },
  { q: "Is this calculator safe to use?", a: "This calculator is for reference only. Always consult a doctor or pharmacist for actual medication doses." },
  { q: "What is Paracetamol dose for children?", a: "Paracetamol for children: 10-15 mg/kg every 4-6 hours. Maximum 4 doses in 24 hours." },
  { q: "How often can I give Ibuprofen to a child?", a: "Ibuprofen: 5-10 mg/kg every 6-8 hours. Not recommended for children under 6 months." },
];

const MEDICINES = [
  { name: "Paracetamol (Panadol)", mgPerKg: 12.5, maxPerDay: 4, interval: "4-6 hours", note: "Safe for all ages" },
  { name: "Ibuprofen (Brufen)", mgPerKg: 7.5, maxPerDay: 3, interval: "6-8 hours", note: "Not for under 6 months" },
  { name: "Amoxicillin", mgPerKg: 25, maxPerDay: 3, interval: "8 hours", note: "Antibiotic — needs prescription" },
  { name: "Cetirizine (Zyrtec)", mgPerKg: 0.25, maxPerDay: 1, interval: "24 hours", note: "Antihistamine" },
];

export const Route = createFileRoute("/medicine-dose-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [weight, setWeight] = useState("20");
  const [medIndex, setMedIndex] = useState(0);

  const med = MEDICINES[medIndex];
  const wt = parseFloat(weight) || 0;
  const dose = wt * med.mgPerKg;
  const dailyDose = dose * med.maxPerDay;

  return (
    <ToolLayout tool={tool}
      howTo={["Enter patient weight in kg.", "Select medicine.", "See recommended dose."]}
      formula="Dose (mg) = Weight (kg) × mg per kg"
      description="Calculate correct medicine dose for children and adults based on body weight. Common medications including Paracetamol, Ibuprofen and Amoxicillin. Reference only — always consult a doctor."
      faqs={FAQS}>
      <div className="p-3 mb-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        ⚠️ <strong>Warning:</strong> This is for reference only. Always consult a doctor or pharmacist before giving any medicine.
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Weight (kg)">
          <input className={inputCls} type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 20" />
        </Field>
        <Field label="Medicine">
          <select className={inputCls} value={medIndex} onChange={e => setMedIndex(parseInt(e.target.value))}>
            {MEDICINES.map((m, i) => <option key={i} value={i}>{m.name}</option>)}
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Single Dose" value={`${fmtNum(dose)} mg`} />
          <Stat label="Daily Max Dose" value={`${fmtNum(dailyDose)} mg`} />
          <Stat label="Frequency" value={`Every ${med.interval}`} />
          <Stat label="Max per Day" value={`${med.maxPerDay} doses`} />
        </div>
        <div className="mt-3 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          📋 Note: {med.note}
        </div>
      </Result>
    </ToolLayout>
  );
}
