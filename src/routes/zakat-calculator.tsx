import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("zakat-calculator")!;
const FAQS = [
  { q: "What is the Zakat rate?", a: "2.5% of total qualifying wealth held for one lunar year above the Nisab." },
  { q: "What is Nisab?", a: "The minimum threshold — typically equivalent to 87.48g of gold or 612.36g of silver." },
  { q: "Is Zakat due on a house I live in?", a: "No — only on savings, gold, silver, business inventory and investments." },
  { q: "When should I pay?", a: "Once per Islamic year, often during Ramadan for additional reward." },
];

export const Route = createFileRoute("/zakat-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [gold, setGold] = useState("0");
  const [silver, setSilver] = useState("0");
  const [cash, setCash] = useState("0");
  const [assets, setAssets] = useState("0");
  const [liab, setLiab] = useState("0");
  const total = [gold, silver, cash, assets].map((v) => parseFloat(v) || 0).reduce((a, b) => a + b, 0);
  const liabilities = parseFloat(liab) || 0;
  const net = Math.max(0, total - liabilities);
  const zakat = net * 0.025;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter value of gold you own (PKR).", "Enter silver, cash and other Zakatable assets.", "Subtract liabilities — see Zakat due."]}
      formula="Zakat = (Total Zakatable Wealth − Liabilities) × 2.5%"
      description={tool.description + " Always consult a local scholar for complex situations — pension, business inventory, agricultural produce have specific rules."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Gold value (PKR)"><input className={inputCls} type="number" value={gold} onChange={(e) => setGold(e.target.value)} /></Field>
        <Field label="Silver value (PKR)"><input className={inputCls} type="number" value={silver} onChange={(e) => setSilver(e.target.value)} /></Field>
        <Field label="Cash / bank (PKR)"><input className={inputCls} type="number" value={cash} onChange={(e) => setCash(e.target.value)} /></Field>
        <Field label="Other assets (PKR)"><input className={inputCls} type="number" value={assets} onChange={(e) => setAssets(e.target.value)} /></Field>
        <Field label="Liabilities / debts (PKR)"><input className={inputCls} type="number" value={liab} onChange={(e) => setLiab(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Total wealth" value={fmtPKR(total)} />
          <Stat label="Net Zakatable" value={fmtPKR(net)} />
          <Stat label="Zakat due (2.5%)" value={fmtPKR(zakat)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
