import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("loan-calculator")!;
const FAQS = [
  { q: "What is EMI?", a: "EMI (Equated Monthly Installment) is the fixed payment you make each month including principal and interest." },
  { q: "Which loans does this work for?", a: "Any reducing-balance loan — car, home, personal or business loan in PKR." },
  { q: "Is this exact for Pakistani banks?", a: "It uses the standard EMI formula. Bank-specific fees (processing, takaful, insurance) are extra." },
  { q: "Can I prepay?", a: "Yes, most Pakistani banks allow prepayment with a small charge. Prepaying reduces total interest." },
];

export const Route = createFileRoute("/loan-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("18");
  const [months, setMonths] = useState("36");

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = parseInt(months) || 0;
  const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - P;

  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter loan amount in PKR.", "Enter annual interest rate (e.g. 18 for 18%).", "Enter loan tenure in months."]}
      formula="EMI = [P × r × (1+r)^n] ÷ [(1+r)^n − 1]\nwhere r = monthly rate, n = months"
      description={tool.description + " Useful for planning a car loan from Meezan, HBL or UBL, or a personal loan from any Pakistani bank."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Principal (PKR)"><input className={inputCls} type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} /></Field>
        <Field label="Annual rate (%)"><input className={inputCls} type="number" value={rate} onChange={(e) => setRate(e.target.value)} /></Field>
        <Field label="Months"><input className={inputCls} type="number" value={months} onChange={(e) => setMonths(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Monthly EMI" value={fmtPKR(emi)} />
          <Stat label="Total interest" value={fmtPKR(interest)} />
          <Stat label="Total payable" value={fmtPKR(total)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
