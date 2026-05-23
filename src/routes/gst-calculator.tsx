import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtPKR } from "@/lib/formulas";

const tool = toolBySlug("gst-calculator")!;
const FAQS = [
  { q: "What is the current GST rate in Pakistan?", a: "The standard GST rate in Pakistan is 17% on most goods and services." },
  { q: "How is GST calculated?", a: "GST = Amount × 17%. Total = Amount + GST." },
  { q: "Can I remove GST from a total price?", a: "Yes — use 'Remove GST' to find the pre-tax price from a GST-inclusive total." },
  { q: "Is GST the same as sales tax?", a: "In Pakistan, GST (General Sales Tax) is the standard federal sales tax administered by FBR." },
];

export const Route = createFileRoute("/gst-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [amount, setAmount] = useState("1000");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [rate, setRate] = useState("17");

  const amt = parseFloat(amount) || 0;
  const r = parseFloat(rate) || 0;
  const gst = mode === "add" ? (amt * r) / 100 : amt - amt / (1 + r / 100);
  const total = mode === "add" ? amt + gst : amt;
  const net = mode === "add" ? amt : amt - gst;

  return (
    <ToolLayout
      tool={tool}
      howTo={[
        "Enter the amount in PKR.",
        "Choose Add GST (price excludes GST) or Remove GST (price includes GST).",
        "See the GST amount, net price and total instantly.",
      ]}
      formula="Add GST: Total = Amount × (1 + 0.17)\nRemove GST: Net = Total ÷ (1 + 0.17)"
      description={tool.description + " Use it for invoicing, shop pricing, or verifying receipts. The default rate is 17% but you can change it for SRO categories or provincial sales tax."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Amount (PKR)">
          <input className={inputCls} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="GST rate (%)">
          <input className={inputCls} type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Mode">
          <select className={inputCls} value={mode} onChange={(e) => setMode(e.target.value as any)}>
            <option value="add">Add GST</option>
            <option value="remove">Remove GST</option>
          </select>
        </Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Net amount" value={fmtPKR(net)} />
          <Stat label="GST" value={fmtPKR(gst)} />
          <Stat label="Total" value={fmtPKR(total)} />
        </div>
      </Result>
    </ToolLayout>
  );
}
