import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR, fmtNum } from "@/lib/formulas";

const tool = toolBySlug("profit-loss-calculator")!;
const FAQS = [
  { q: "How is profit % calculated?", a: "Profit % = ((SP − CP) ÷ CP) × 100" },
  { q: "When is it a loss?", a: "When selling price is less than cost price." },
  { q: "Can I use this for online business?", a: "Yes — perfect for resellers, Daraz sellers and shopkeepers." },
  { q: "Does this account for tax?", a: "No, enter pre-tax cost and selling price." },
];

export const Route = createFileRoute("/profit-loss-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [cp, setCp] = useState("1000");
  const [sp, setSp] = useState("1200");
  const c = parseFloat(cp) || 0;
  const s = parseFloat(sp) || 0;
  const diff = s - c;
  const pct = c ? (diff / c) * 100 : 0;
  const isProfit = diff >= 0;

  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter cost price (CP) in PKR.", "Enter selling price (SP) in PKR.", "See profit or loss and percentage."]}
      formula="Profit/Loss = SP − CP\nPercentage = (Profit ÷ CP) × 100"
      description={tool.description + " Use it to price products in your shop, set Daraz/Shopify margins or evaluate any resale deal."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Cost Price (PKR)"><input className={inputCls} type="number" value={cp} onChange={(e) => setCp(e.target.value)} /></Field>
        <Field label="Selling Price (PKR)"><input className={inputCls} type="number" value={sp} onChange={(e) => setSp(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label={isProfit ? "Profit" : "Loss"} value={fmtPKR(Math.abs(diff))} />
          <Stat label={isProfit ? "Profit %" : "Loss %"} value={`${fmtNum(Math.abs(pct), 2)}%`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
