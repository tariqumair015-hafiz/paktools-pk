import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "govt-salary-calculator", name: "Govt Employee Salary Calculator", description: "Calculate Pakistan government employee salary by BPS grade. Includes all allowances 2024-25.", icon: "🏛️", category: "finance" as const };

const FAQS = [
  { q: "What is BPS in Pakistan?", a: "BPS stands for Basic Pay Scale. Pakistan government employees are classified from BPS-1 to BPS-22." },
  { q: "What allowances do govt employees get?", a: "House Rent Allowance (HRA), Medical Allowance, Conveyance Allowance, and other special allowances." },
  { q: "When was the last salary increase for govt employees?", a: "The government announced salary increases in Budget 2024-25 with an adhoc relief allowance." },
  { q: "How is gross salary different from net salary?", a: "Gross salary includes all allowances. Net salary is after deductions like income tax and EOBI." },
];

const BPS_SCALES: Record<number, { min: number; max: number }> = {
  1: { min: 9000, max: 18500 }, 2: { min: 9300, max: 19700 }, 3: { min: 9700, max: 21000 },
  4: { min: 10200, max: 22300 }, 5: { min: 10900, max: 24200 }, 6: { min: 11900, max: 26600 },
  7: { min: 12700, max: 28800 }, 8: { min: 13700, max: 31300 }, 9: { min: 14900, max: 34400 },
  10: { min: 16200, max: 37800 }, 11: { min: 17600, max: 41500 }, 12: { min: 19400, max: 46100 },
  13: { min: 22600, max: 54800 }, 14: { min: 26600, max: 65600 }, 15: { min: 32000, max: 79700 },
  16: { min: 39500, max: 99600 }, 17: { min: 53800, max: 136500 }, 18: { min: 75300, max: 191300 },
  19: { min: 107300, max: 272600 }, 20: { min: 140800, max: 357300 }, 21: { min: 178000, max: 452100 },
  22: { min: 223200, max: 566300 },
};

export const Route = createFileRoute("/govt-salary-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [grade, setGrade] = useState("17");
  const [stage, setStage] = useState("1");

  const bps = parseInt(grade);
  const stageNum = parseInt(stage);
  const scaleData = BPS_SCALES[bps];

  const basicPay = scaleData ? Math.round(scaleData.min + ((scaleData.max - scaleData.min) / 29) * (stageNum - 1)) : 0;
  const hra = Math.round(basicPay * 0.45);
  const medical = bps >= 17 ? 25000 : bps >= 11 ? 15000 : 10000;
  const conveyance = bps >= 17 ? 10000 : bps >= 11 ? 7000 : 4000;
  const adhoc = Math.round(basicPay * 0.25);
  const grossSalary = basicPay + hra + medical + conveyance + adhoc;
  const incomeTax = grossSalary * 12 > 600000 ? Math.round(grossSalary * 0.05) : 0;
  const eobi = Math.round(basicPay * 0.01);
  const netSalary = grossSalary - incomeTax - eobi;

  return (
    <ToolLayout tool={tool}
      howTo={["Select your BPS grade (1-22).", "Select your stage/increment.", "See complete salary breakdown."]}
      formula="Gross = Basic Pay + HRA (45%) + Medical + Conveyance + Adhoc Relief (25%)"
      description="Calculate exact Pakistan government employee salary for all BPS grades 1 to 22. Includes house rent, medical, conveyance and adhoc allowances as per Finance Division 2024-25."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="BPS Grade">
          <select className={inputCls} value={grade} onChange={e => setGrade(e.target.value)}>
            {Array.from({length: 22}, (_, i) => i+1).map(g => <option key={g} value={g}>BPS-{g}</option>)}
          </select>
        </Field>
        <Field label="Stage / Increment">
          <select className={inputCls} value={stage} onChange={e => setStage(e.target.value)}>
            {Array.from({length: 30}, (_, i) => i+1).map(s => <option key={s} value={s}>Stage {s}</option>)}
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Basic Pay" value={`Rs ${fmtNum(basicPay)}`} />
          <Stat label="House Rent (45%)" value={`Rs ${fmtNum(hra)}`} />
          <Stat label="Medical Allowance" value={`Rs ${fmtNum(medical)}`} />
          <Stat label="Conveyance" value={`Rs ${fmtNum(conveyance)}`} />
          <Stat label="Adhoc Relief (25%)" value={`Rs ${fmtNum(adhoc)}`} />
          <Stat label="Gross Salary" value={`Rs ${fmtNum(grossSalary)}`} />
          <Stat label="Income Tax" value={`Rs ${fmtNum(incomeTax)}`} />
          <Stat label="Net Take-Home" value={`Rs ${fmtNum(netSalary)}`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
