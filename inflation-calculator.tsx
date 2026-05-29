import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "inflation-calculator", name: "Inflation Calculator Pakistan", description: "Calculate the real value of money over time considering Pakistan's inflation rate.", icon: "📈", category: "finance" as const };

const FAQS = [
  { q: "What is Pakistan's current inflation rate?", a: "Pakistan's inflation rate has been high in recent years, ranging from 20-38% in 2023-24. It has started decreasing in 2025." },
  { q: "How does inflation affect savings?", a: "If inflation is 20% and your savings give 15% return, you are actually losing 5% real purchasing power." },
  { q: "What was 1 lakh worth 10 years ago?", a: "Due to inflation, Rs 100,000 in 2015 is equivalent to approximately Rs 350,000-400,000 in 2025." },
  { q: "How to protect money from inflation in Pakistan?", a: "Gold, real estate, stocks and high-yield savings accounts are common inflation hedges in Pakistan." },
];

const YEARLY_INFLATION: Record<number, number> = {
  2015: 4.5, 2016: 3.8, 2017: 4.2, 2018: 5.1, 2019: 10.6,
  2020: 10.7, 2021: 8.9, 2022: 19.9, 2023: 28.8, 2024: 23.4, 2025: 8.0
};

export const Route = createFileRoute("/inflation-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [amount, setAmount] = useState("100000");
  const [fromYear, setFromYear] = useState("2015");
  const [toYear, setToYear] = useState("2025");
  const [customRate, setCustomRate] = useState("");

  const amt = parseFloat(amount) || 0;
  const from = parseInt(fromYear);
  const to = parseInt(toYear);

  let adjustedAmount = amt;
  if (from < to) {
    for (let y = from; y < to; y++) {
      const rate = customRate ? parseFloat(customRate) : (YEARLY_INFLATION[y] || 12);
      adjustedAmount *= (1 + rate / 100);
    }
  } else if (to < from) {
    for (let y = to; y < from; y++) {
      const rate = customRate ? parseFloat(customRate) : (YEARLY_INFLATION[y] || 12);
      adjustedAmount /= (1 + rate / 100);
    }
  }

  const totalChange = adjustedAmount - amt;
  const totalPct = amt > 0 ? (totalChange / amt * 100) : 0;
  const years = Math.abs(to - from);
  const avgAnnual = years > 0 ? (Math.pow(adjustedAmount / amt, 1 / years) - 1) * 100 : 0;

  return (
    <ToolLayout tool={tool}
      howTo={["Enter amount.", "Select from year and to year.", "Optionally enter custom inflation rate.", "See purchasing power change."]}
      formula="Adjusted Amount = Original × (1 + Inflation Rate)^Years"
      description="Calculate how much money has lost or gained purchasing power due to Pakistan's inflation. Uses actual historical inflation data from PBS (Pakistan Bureau of Statistics)."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Amount (PKR)">
          <input className={inputCls} type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 100000" />
        </Field>
        <Field label="Custom Inflation Rate % (optional)">
          <input className={inputCls} type="number" value={customRate} onChange={e => setCustomRate(e.target.value)} placeholder="Leave empty for actual rates" />
        </Field>
        <Field label="From Year">
          <select className={inputCls} value={fromYear} onChange={e => setFromYear(e.target.value)}>
            {Array.from({length: 11}, (_, i) => 2015 + i).map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
        <Field label="To Year">
          <select className={inputCls} value={toYear} onChange={e => setToYear(e.target.value)}>
            {Array.from({length: 11}, (_, i) => 2015 + i).map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label={`Value in ${toYear}`} value={`Rs ${fmtNum(adjustedAmount)}`} />
          <Stat label="Total Change" value={`Rs ${fmtNum(Math.abs(totalChange))} (${totalPct > 0 ? "+" : ""}${totalPct.toFixed(1)}%)`} />
          <Stat label="Avg Annual Inflation" value={`${avgAnnual.toFixed(1)}%`} />
          <Stat label="Period" value={`${years} year${years !== 1 ? "s" : ""}`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
