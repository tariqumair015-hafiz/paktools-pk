import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "gold-price-calculator", name: "Gold Price Calculator Pakistan", description: "Calculate gold price in Pakistan per tola, gram and ounce. 24K, 22K and 21K rates.", icon: "🪙", category: "finance" as const };

const FAQS = [
  { q: "What is the current gold price in Pakistan?", a: "Gold prices change daily. As of 2025, 24K gold is approximately Rs 260,000-280,000 per tola." },
  { q: "What is 1 tola in grams?", a: "1 tola = 11.664 grams. This is the standard measurement used in Pakistan for gold." },
  { q: "What is the difference between 24K, 22K and 21K gold?", a: "24K is pure gold (99.9%). 22K is 91.6% pure. 21K is 87.5% pure. Jewelry is usually 22K or 21K." },
  { q: "How is gold price calculated in Pakistan?", a: "Gold price = International price (USD/oz) × USD rate ÷ 31.1 × 11.664 (per tola) + import duty." },
];

export const Route = createFileRoute("/gold-price-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [pricePerTola, setPricePerTola] = useState("270000");
  const [karat, setKarat] = useState("24");
  const [weight, setWeight] = useState("1");
  const [unit, setUnit] = useState("tola");

  const basePrice = parseFloat(pricePerTola) || 0;
  const karatMultiplier = karat === "24" ? 1 : karat === "22" ? 0.916 : karat === "21" ? 0.875 : 0.75;
  const weightNum = parseFloat(weight) || 0;

  const pricePerGram = basePrice / 11.664;
  const pricePerOz = pricePerGram * 31.1;
  const karatPrice = basePrice * karatMultiplier;

  let totalPrice = 0;
  if (unit === "tola") totalPrice = karatPrice * weightNum;
  else if (unit === "gram") totalPrice = pricePerGram * karatMultiplier * weightNum;
  else if (unit === "ounce") totalPrice = pricePerOz * karatMultiplier * weightNum;

  return (
    <ToolLayout tool={tool}
      howTo={["Enter current gold price per tola (24K).", "Select karat (24K, 22K, 21K).", "Enter weight and unit.", "See total gold value."]}
      formula="Gold Value = Price per Tola × Karat Purity × Weight"
      description="Calculate gold price in Pakistan for any weight and karat. Perfect for buying/selling jewelry, checking investment value and comparing gold rates in Karachi, Lahore, Islamabad."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Gold Price per Tola (24K, PKR)">
          <input className={inputCls} type="number" value={pricePerTola} onChange={e => setPricePerTola(e.target.value)} placeholder="e.g. 270000" />
        </Field>
        <Field label="Karat">
          <select className={inputCls} value={karat} onChange={e => setKarat(e.target.value)}>
            <option value="24">24K (Pure Gold)</option>
            <option value="22">22K (91.6%)</option>
            <option value="21">21K (87.5%)</option>
            <option value="18">18K (75%)</option>
          </select>
        </Field>
        <Field label="Weight">
          <input className={inputCls} type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 5" />
        </Field>
        <Field label="Unit">
          <select className={inputCls} value={unit} onChange={e => setUnit(e.target.value)}>
            <option value="tola">Tola</option>
            <option value="gram">Gram</option>
            <option value="ounce">Ounce (oz)</option>
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="Total Gold Value" value={`Rs ${fmtNum(totalPrice)}`} />
          <Stat label={`${karat}K Price per Tola`} value={`Rs ${fmtNum(karatPrice)}`} />
          <Stat label="Price per Gram" value={`Rs ${fmtNum(pricePerGram * karatMultiplier)}`} />
          <Stat label="Price per Ounce" value={`Rs ${fmtNum(pricePerOz * karatMultiplier)}`} />
        </div>
      </Result>
    </ToolLayout>
  );
}
