import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("discount-calculator")!;
const FAQS = [
  { q: "How is the discount calculated?", a: "Discount Amount = Original Price × (Discount % ÷ 100). Final Price = Original − Discount." },
  { q: "Can I use this on sale items?", a: "Yes — perfect for Black Friday, Daraz 11.11, Outfitters sales and any retail discount." },
  { q: "Does it include sales tax?", a: "No — enter price before tax. Use our GST Calculator for tax separately." },
  { q: "Can I calculate stacked discounts?", a: "Apply the first discount, then run the tool again on the new price for the second discount." },
];

export const Route = createFileRoute("/discount-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [price, setPrice] = useState("5000");
  const [disc, setDisc] = useState("20");
  const p = parseFloat(price) || 0;
  const d = parseFloat(disc) || 0;
  const saving = (p * d) / 100;
  const final = p - saving;
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter original price.", "Enter discount %.", "See savings and final price."]}
      formula="Saving = Price × Discount% ÷ 100\nFinal = Price − Saving"
      description={tool.description + " Quickly check whether a deal is really worth it before you tap Buy on Daraz, OLX or in a retail store."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Original Price (PKR)"><input className={inputCls} type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Field>
        <Field label="Discount (%)"><input className={inputCls} type="number" value={disc} onChange={(e) => setDisc(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-2 gap-4">
          <Stat label="You save" value={fmtPKR(saving)} />
          <Stat label="Final price" value={fmtPKR(final)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
