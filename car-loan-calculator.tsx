import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "car-loan-calculator", name: "Car Loan Calculator", description: "Calculate monthly car installment in Pakistan. Enter car price, down payment, markup rate and loan duration.", icon: "🚗", category: "finance" as const };

const FAQS = [
  { q: "What is the current car loan markup rate in Pakistan?", a: "Most Pakistani banks offer car loans at 20-25% markup rate per annum in 2025." },
  { q: "Which banks offer car loans in Pakistan?", a: "Meezan Bank, HBL, UBL, Bank Alfalah, MCB and Al Baraka offer car financing in Pakistan." },
  { q: "What is the minimum down payment for car loan?", a: "Typically 15-20% of car price is required as down payment." },
  { q: "How long can I take a car loan for?", a: "Car loans in Pakistan are available for 1 to 7 years (12 to 84 months)." },
];

export const Route = createFileRoute("/car-loan-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [price, setPrice] = useState("3000000");
  const [down, setDown] = useState("600000");
  const [rate, setRate] = useState("22");
  const [months, setMonths] = useState("60");

  const carPrice = parseFloat(price) || 0;
  const downPayment = parseFloat(down) || 0;
  const annualRate = parseFloat(rate) || 0;
  const tenure = parseFloat(months) || 0;

  const principal = carPrice - downPayment;
  const monthlyRate = annualRate / 12 / 100;
  const emi = principal > 0 && monthlyRate > 0 && tenure > 0
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)
    : 0;
  const totalPayment = emi * tenure;
  const totalMarkup = totalPayment - principal;
  const downPct = carPrice > 0 ? (downPayment / carPrice * 100).toFixed(1) : "0";

  return (
    <ToolLayout tool={tool}
      howTo={["Enter total car price.", "Enter down payment amount.", "Enter bank markup rate %.", "Select loan duration in months."]}
      formula="EMI = P × r × (1+r)^n / ((1+r)^n - 1) where P=Principal, r=Monthly Rate, n=Months"
      description="Calculate your monthly car installment for any Pakistani bank. Works for Meezan Bank, HBL, UBL, Bank Alfalah and all other banks offering car financing in Pakistan."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Car Price (PKR)">
          <input className={inputCls} type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 3000000" />
        </Field>
        <Field label="Down Payment (PKR)">
          <input className={inputCls} type="number" value={down} onChange={e => setDown(e.target.value)} placeholder="e.g. 600000" />
        </Field>
        <Field label="Bank Markup Rate (% per year)">
          <input className={inputCls} type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 22" step="0.1" />
        </Field>
        <Field label="Loan Duration (Months)">
          <select className={inputCls} value={months} onChange={e => setMonths(e.target.value)}>
            {[12,24,36,48,60,72,84].map(m => <option key={m} value={m}>{m} months ({m/12} year{m>12?"s":""})</option>)}
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Monthly Installment" value={`Rs ${fmtNum(emi)}`} />
          <Stat label="Loan Amount (Principal)" value={`Rs ${fmtNum(principal)}`} />
          <Stat label="Total Payment" value={`Rs ${fmtNum(totalPayment)}`} />
          <Stat label="Total Markup (Interest)" value={`Rs ${fmtNum(totalMarkup)}`} />
          <Stat label="Down Payment %" value={`${downPct}%`} />
          <Stat label="Loan Duration" value={`${months} months`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
