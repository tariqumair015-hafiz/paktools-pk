import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fbrSalariedTax, fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("salary-tax-calculator")!;
const FAQS = [
  { q: "Which slabs are used?", a: "FBR 2024-25 salaried tax slabs." },
  { q: "How is take-home calculated?", a: "Take-home = Gross Salary − Monthly Income Tax." },
  { q: "Does this include EOBI or provident fund?", a: "No, only income tax. Add your own EOBI/PF deductions separately." },
  { q: "Is this for private and government employees?", a: "Yes — the salaried slabs apply to both." },
];

export const Route = createFileRoute("/salary-tax-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [salary, setSalary] = useState("150000");
  const m = parseFloat(salary) || 0;
  const yearly = m * 12;
  const tax = fbrSalariedTax(yearly);
  const monthlyTax = tax / 12;
  const take = m - monthlyTax;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter your monthly gross salary in PKR.", "See yearly income, yearly tax, monthly tax and take-home."]}
      formula="Yearly = Monthly × 12\nTax = FBR slab tax on yearly\nTake-home = Monthly − (Tax ÷ 12)"
      description={tool.description + " Helpful for negotiating offers, planning monthly budgets, or estimating your net pay before joining a new job."}
      faqs={FAQS}
    >
      <Field label="Monthly Gross Salary (PKR)">
        <input className={inputCls} type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
      </Field>
      <Result>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Yearly income" value={fmtPKR(yearly)} />
          <Stat label="Yearly tax" value={fmtPKR(tax)} />
          <Stat label="Monthly tax" value={fmtPKR(monthlyTax)} />
          <Stat label="Take-home/mo" value={fmtPKR(take)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
