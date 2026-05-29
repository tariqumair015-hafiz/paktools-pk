import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("tip-calculator")!;
const FAQS = [
  { q: "What's a normal tip in Pakistan?", a: "10% is standard at restaurants in Pakistan. 15% for great service." },
  { q: "Is service charge the same as tip?", a: "No — service charge is added by the restaurant. Tip is voluntary on top." },
  { q: "Can I split the bill?", a: "Yes — enter the number of people to get per-person share." },
  { q: "Is tipping expected at dhabas?", a: "Not really — but rounding up the bill is appreciated." },
];

export const Route = createFileRoute("/tip-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [bill, setBill] = useState("3000");
  const [tipPct, setTipPct] = useState("10");
  const [people, setPeople] = useState("2");
  const b = parseFloat(bill) || 0;
  const t = parseFloat(tipPct) || 0;
  const p = parseInt(people) || 1;
  const tip = (b * t) / 100;
  const total = b + tip;
  const perPerson = total / p;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter bill amount.", "Enter tip percentage.", "Enter number of people to split."]}
      formula="Tip = Bill × Tip% ÷ 100\nTotal = Bill + Tip\nPer person = Total ÷ People"
      description={tool.description + " Useful after eating out with friends, splitting a Foodpanda group order or calculating service charge equivalent."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Bill (PKR)"><input className={inputCls} type="number" value={bill} onChange={(e) => setBill(e.target.value)} /></Field>
        <Field label="Tip %"><input className={inputCls} type="number" value={tipPct} onChange={(e) => setTipPct(e.target.value)} /></Field>
        <Field label="People"><input className={inputCls} type="number" value={people} onChange={(e) => setPeople(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Tip" value={fmtPKR(tip)} />
          <Stat label="Total" value={fmtPKR(total)} />
          <Stat label="Per person" value={fmtPKR(perPerson)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
