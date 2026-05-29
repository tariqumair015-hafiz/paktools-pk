import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "pension-calculator", name: "Pension Calculator Pakistan", description: "Calculate Pakistan government employee pension and gratuity. Updated 2024-25 rules.", icon: "👴", category: "finance" as const };

const FAQS = [
  { q: "How is pension calculated in Pakistan?", a: "Pension = (Last Basic Pay × Service Years) / 70. Maximum pension is 70% of last basic pay after 30+ years of service." },
  { q: "What is commutation of pension?", a: "You can get a lump sum by commuting up to 35% of your pension. The remaining 65% is paid monthly." },
  { q: "When can a govt employee retire in Pakistan?", a: "Mandatory retirement age is 60 years. Voluntary retirement is allowed after 25 years of service." },
  { q: "Is pension taxable in Pakistan?", a: "Pension received by govt employees is exempt from income tax in Pakistan." },
];

export const Route = createFileRoute("/pension-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [lastBasic, setLastBasic] = useState("80000");
  const [serviceYears, setServiceYears] = useState("30");

  const basic = parseFloat(lastBasic) || 0;
  const years = Math.min(parseFloat(serviceYears) || 0, 30);

  const pensionPct = Math.min(years / 30 * 70, 70);
  const monthlyPension = Math.round(basic * pensionPct / 100);
  const commutation35 = Math.round(monthlyPension * 0.35 * 12 * 10);
  const remainingPension = Math.round(monthlyPension * 0.65);
  const gratuity = Math.round(basic * Math.min(parseFloat(serviceYears) || 0, 30));
  const annualPension = monthlyPension * 12;

  return (
    <ToolLayout tool={tool}
      howTo={["Enter your last basic pay.", "Enter total service years.", "See complete pension breakdown."]}
      formula="Monthly Pension = (Last Basic Pay × Service Years) / 70 | Max 70% after 30 years"
      description="Calculate Pakistan government employee pension accurately. Updated with 2024-25 Finance Division rules for federal and provincial employees."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Last Basic Pay (PKR)">
          <input className={inputCls} type="number" value={lastBasic} onChange={e => setLastBasic(e.target.value)} placeholder="e.g. 80000" />
        </Field>
        <Field label="Total Service Years">
          <input className={inputCls} type="number" value={serviceYears} onChange={e => setServiceYears(e.target.value)} placeholder="e.g. 30" max="35" />
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Pension %" value={`${pensionPct.toFixed(1)}%`} />
          <Stat label="Monthly Pension" value={`Rs ${fmtNum(monthlyPension)}`} />
          <Stat label="Annual Pension" value={`Rs ${fmtNum(annualPension)}`} />
          <Stat label="Commutation (35%)" value={`Rs ${fmtNum(commutation35)}`} />
          <Stat label="After Commutation (Monthly)" value={`Rs ${fmtNum(remainingPension)}`} />
          <Stat label="Gratuity (approx)" value={`Rs ${fmtNum(gratuity)}`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
