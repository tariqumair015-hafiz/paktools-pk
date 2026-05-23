import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fbrSalariedTax, fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("income-tax-calculator")!;
const FAQS = [
  { q: "Which tax year does this use?", a: "FBR salaried slabs for tax year 2024-25." },
  { q: "Are the slabs accurate?", a: "Yes — 0% up to 600k, 5%, 15%, 25%, 30% and 35% on higher brackets as notified by FBR." },
  { q: "Does this include surcharge?", a: "No, this is base income tax only. Surcharge on high incomes is applied separately by FBR." },
  { q: "Is this for salaried or business income?", a: "These slabs apply to salaried individuals. Business income slabs differ." },
];

export const Route = createFileRoute("/income-tax-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [income, setIncome] = useState("100000");
  const inc = parseFloat(income) || 0;
  const annual = period === "monthly" ? inc * 12 : inc;
  const yearlyTax = fbrSalariedTax(annual);
  const monthlyTax = yearlyTax / 12;
  const monthlyTake = annual / 12 - monthlyTax;

  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter your salary.", "Choose monthly or yearly.", "See yearly tax, monthly tax and take-home."]}
      formula={`FBR 2024-25 Salaried:
0 – 600,000        : 0%
600,001 – 1,200,000: 5%
1,200,001 – 2,200,000: 15%
2,200,001 – 3,200,000: 25%
3,200,001 – 4,100,000: 30%
Above 4,100,000     : 35%`}
      description={tool.description + " Useful for budgeting, salary negotiation, or estimating annual liability before filing your return on FBR IRIS."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Salary">
          <input className={inputCls} type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
        </Field>
        <Field label="Period">
          <select className={inputCls} value={period} onChange={(e) => setPeriod(e.target.value as any)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Yearly tax" value={fmtPKR(yearlyTax)} />
          <Stat label="Monthly tax" value={fmtPKR(monthlyTax)} />
          <Stat label="Monthly take-home" value={fmtPKR(monthlyTake)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
