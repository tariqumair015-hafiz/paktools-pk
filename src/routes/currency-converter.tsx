import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";

const tool = toolBySlug("currency-converter")!;
const FAQS = [
  { q: "Where do the rates come from?", a: "Live rates from exchangerate-api.com updated daily. If unavailable, approximate market rates are shown." },
  { q: "Which currencies are supported?", a: "USD, SAR, AED, GBP and EUR against Pakistani Rupee (PKR)." },
  { q: "Are these interbank or open-market rates?", a: "These are mid-market rates. Actual buying/selling rates at banks or money changers will differ." },
  { q: "Is the data accurate enough for remittances?", a: "Use it for reference. For actual remittance, check your bank's TT/DD rate." },
];

const CURRENCIES = ["USD", "SAR", "AED", "GBP", "EUR"];
const FALLBACK: Record<string, number> = { USD: 0.00360, SAR: 0.01351, AED: 0.01322, GBP: 0.00284, EUR: 0.00333 };

export const Route = createFileRoute("/currency-converter")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [amount, setAmount] = useState("10000");
  const [to, setTo] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/PKR")
      .then((r) => r.json())
      .then((d) => {
        if (d?.rates) {
          setRates(d.rates);
          setUsingFallback(false);
          setUpdatedAt(new Date().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" }));
        } else {
          setUsingFallback(true);
          setUpdatedAt("Approximate rates (offline)");
        }
      })
      .catch(() => {
        setUsingFallback(true);
        setUpdatedAt("Approximate rates (offline)");
      })
      .finally(() => setLoading(false));
  }, []);

  const amt = parseFloat(amount) || 0;
  const rate = rates?.[to] || FALLBACK[to];
  const converted = amt * rate;

  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter amount in PKR.", "Choose target currency.", "See the converted amount instantly."]}
      formula="Converted = PKR Amount × Exchange Rate"
      description={tool.description + " Useful for online shopping in USD, Hajj/Umrah expenses in SAR, UAE remittances in AED, UK studies in GBP and European travel in EUR."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Amount (PKR)">
          <input className={inputCls} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="Convert to">
          <select className={inputCls} value={to} onChange={(e) => setTo(e.target.value)}>
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Result>
        {loading ? (
          <div className="animate-pulse h-12 bg-muted rounded" />
        ) : (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <Stat label={`Equivalent in ${to}`} value={`${fmtNum(converted, 4)} ${to}`} />
              <Stat label="Rate (1 PKR =)" value={`${fmtNum(rate, 6)} ${to}`} />
            </div>
            <p className={`text-xs ${usingFallback ? "text-amber-600" : "text-muted-foreground"}`}>
              {usingFallback ? "⚠ Using approximate rates — internet connection needed for live rates" : `✓ Live rates · Updated: ${updatedAt}`}
            </p>
          </div>
        )}
      </Result>
    </ToolLayout>
  );
}
