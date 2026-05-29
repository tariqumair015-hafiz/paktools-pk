import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "pta-tax-calculator", name: "PTA Mobile Tax Calculator", description: "Calculate PTA mobile registration tax in Pakistan for imported phones. Supports all brands.", icon: "📱", category: "finance" as const };

const FAQS = [
  { q: "What is PTA tax in Pakistan?", a: "PTA (Pakistan Telecommunication Authority) charges a registration fee on all imported mobile phones to use Pakistani SIM cards." },
  { q: "How is PTA tax calculated?", a: "PTA tax is calculated based on phone price in USD. Higher the price, higher the duty." },
  { q: "Do I need to pay PTA tax for iPhone?", a: "Yes, all iPhones and imported smartphones need PTA registration to work with Pakistani SIMs." },
  { q: "What happens if phone is not PTA registered?", a: "Unregistered phones get blocked after 60 days of arrival in Pakistan." },
];

// PTA Tax slabs 2024-25
const PTA_SLABS = [
  { maxUSD: 30, fixedPKR: 430 },
  { maxUSD: 100, fixedPKR: 3200 },
  { maxUSD: 200, fixedPKR: 9580 },
  { maxUSD: 350, fixedPKR: 12200 },
  { maxUSD: 500, fixedPKR: 17800 },
  { maxUSD: 700, fixedPKR: 36870 },
  { maxUSD: 1000, fixedPKR: 49250 },
  { maxUSD: Infinity, fixedPKR: 65000 },
];

export const Route = createFileRoute("/pta-tax-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [priceUSD, setPriceUSD] = useState("500");
  const [usdRate, setUsdRate] = useState("278");

  const price = parseFloat(priceUSD) || 0;
  const rate = parseFloat(usdRate) || 278;

  const slab = PTA_SLABS.find(s => price <= s.maxUSD);
  const ptaTaxPKR = slab ? slab.fixedPKR : 65000;
  const phonePricePKR = price * rate;
  const totalCostPKR = phonePricePKR + ptaTaxPKR;

  return (
    <ToolLayout tool={tool}
      howTo={["Enter phone price in USD.", "Check or update USD to PKR rate.", "See PTA tax amount instantly."]}
      formula="PTA Tax is fixed per slab based on phone price in USD (FBR 2024-25 rates)"
      description="Calculate exact PTA mobile registration tax for your imported phone in Pakistan. Updated with latest FBR 2024-25 duty slabs. Works for iPhone, Samsung, and all brands."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone Price (USD)">
          <input className={inputCls} type="number" value={priceUSD} onChange={e => setPriceUSD(e.target.value)} placeholder="e.g. 500" />
        </Field>
        <Field label="USD Rate (PKR)">
          <input className={inputCls} type="number" value={usdRate} onChange={e => setUsdRate(e.target.value)} placeholder="e.g. 278" />
        </Field>
      </div>
      <div className="mt-4 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
        <strong>PTA Tax Slabs 2024-25:</strong> Up to $30 → Rs 430 | $31-100 → Rs 3,200 | $101-200 → Rs 9,580 | $201-350 → Rs 12,200 | $351-500 → Rs 17,800 | $501-700 → Rs 36,870 | $701-1000 → Rs 49,250 | Above $1000 → Rs 65,000
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="PTA Tax Amount" value={`Rs ${fmtNum(ptaTaxPKR)}`} />
          <Stat label="Phone Price in PKR" value={`Rs ${fmtNum(phonePricePKR)}`} />
          <Stat label="Total Cost in Pakistan" value={`Rs ${fmtNum(totalCostPKR)}`} />
          <Stat label="Tax Slab" value={`Up to $${slab?.maxUSD === Infinity ? "1000+" : slab?.maxUSD}`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
