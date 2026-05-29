import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "umrah-savings-calculator", name: "Umrah Savings Calculator", description: "Calculate how long it will take to save for Umrah or Hajj in Pakistan. Monthly savings planner.", icon: "🕌", category: "daily" as const };

const FAQS = [
  { q: "What is the current Umrah package cost from Pakistan?", a: "Umrah packages from Pakistan typically range from Rs 150,000 to Rs 400,000 per person depending on the season and hotel category." },
  { q: "What is the Hajj cost from Pakistan?", a: "Government Hajj scheme costs approximately Rs 1,200,000-1,500,000 per person in 2025." },
  { q: "When is the best time for Umrah from Pakistan?", a: "Ramadan Umrah is most spiritual but most expensive. Off-season months like Muharram and Safar are cheapest." },
  { q: "Can I do installment for Umrah?", a: "Yes, many travel agencies and banks in Pakistan offer Umrah installment plans." },
];

export const Route = createFileRoute("/umrah-savings-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [target, setTarget] = useState("300000");
  const [saved, setSaved] = useState("0");
  const [monthly, setMonthly] = useState("15000");
  const [persons, setPersons] = useState("2");
  const [type, setType] = useState("umrah");

  const targetAmount = parseFloat(target) || 0;
  const alreadySaved = parseFloat(saved) || 0;
  const monthlySaving = parseFloat(monthly) || 0;
  const numPersons = parseFloat(persons) || 1;
  const totalTarget = targetAmount * numPersons;
  const remaining = Math.max(totalTarget - alreadySaved, 0);
  const monthsNeeded = monthlySaving > 0 ? Math.ceil(remaining / monthlySaving) : 0;
  const yearsNeeded = Math.floor(monthsNeeded / 12);
  const extraMonths = monthsNeeded % 12;

  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + monthsNeeded);

  return (
    <ToolLayout tool={tool}
      howTo={["Select Umrah or Hajj.", "Enter package cost per person.", "Enter number of persons.", "Enter monthly savings amount.", "See when you can go!"]}
      formula="Months Needed = (Total Target - Already Saved) ÷ Monthly Savings"
      description="Plan your Umrah or Hajj savings with our free calculator. Calculate exactly how many months you need to save based on your monthly income and current savings."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Trip Type">
          <select className={inputCls} value={type} onChange={e => { setType(e.target.value); setTarget(e.target.value === "hajj" ? "1300000" : "300000"); }}>
            <option value="umrah">Umrah</option>
            <option value="hajj">Hajj</option>
          </select>
        </Field>
        <Field label="Number of Persons">
          <input className={inputCls} type="number" value={persons} onChange={e => setPersons(e.target.value)} min="1" />
        </Field>
        <Field label="Package Cost per Person (PKR)">
          <input className={inputCls} type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="e.g. 300000" />
        </Field>
        <Field label="Already Saved (PKR)">
          <input className={inputCls} type="number" value={saved} onChange={e => setSaved(e.target.value)} placeholder="e.g. 50000" />
        </Field>
        <Field label="Monthly Savings (PKR)">
          <input className={inputCls} type="number" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="e.g. 15000" />
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Total Amount Needed" value={`Rs ${fmtNum(totalTarget)}`} />
          <Stat label="Remaining to Save" value={`Rs ${fmtNum(remaining)}`} />
          <Stat label="Time Needed" value={yearsNeeded > 0 ? `${yearsNeeded}y ${extraMonths}m` : `${monthsNeeded} months`} />
          <Stat label="Target Date" value={targetDate.toLocaleDateString("en-PK", { month: "long", year: "numeric" })} />
        </div>
        {monthsNeeded <= 12 && monthsNeeded > 0 && (
          <div className="mt-4 text-center text-sm text-green-600 font-medium">🕌 MashaAllah! Aap is saal ja sakte hain!</div>
        )}
      </Result>
    </ToolLayout>
  );
}
