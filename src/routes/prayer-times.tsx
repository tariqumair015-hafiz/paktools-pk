import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";

const tool = toolBySlug("prayer-times")!;
const FAQS = [
  { q: "Which calculation method is used?", a: "Karachi (University of Islamic Sciences) — standard for Pakistan." },
  { q: "Source of data?", a: "The free AlAdhan.com Prayer Times API." },
  { q: "Are these times exact?", a: "They're calculated astronomically. Cross-check with your local mosque for Jamat times." },
  { q: "Does it support all Pakistani cities?", a: "Yes — Karachi, Lahore, Islamabad, Rawalpindi, Multan, Peshawar, Quetta and any other city." },
];

const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const Route = createFileRoute("/prayer-times")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [city, setCity] = useState("Karachi");
  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = (c: string) => {
    setLoading(true); setErr(null);
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(c)}&country=Pakistan&method=1`)
      .then((r) => r.json())
      .then((d) => {
        if (d?.data?.timings) {
          setTimes(d.data.timings);
          setDate(d.data.date?.readable || "");
        } else setErr("City not found");
      })
      .catch(() => setErr("Could not load prayer times"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(city); }, []);

  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter your city in Pakistan.", "See today's 5 prayer times instantly."]}
      formula="Karachi method · Hanafi Asr (default for Pakistan)"
      description={tool.description + " Powered by the AlAdhan API. Times are astronomically calculated and shown in your local time."}
      faqs={FAQS}
    >
      <form onSubmit={(e) => { e.preventDefault(); load(city); }} className="flex gap-2">
        <Field label="City"><input className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Karachi, Lahore, Islamabad…" /></Field>
        <button className="self-end h-11 rounded-lg bg-primary text-primary-foreground px-5 font-medium">Get times</button>
      </form>
      <Result>
        {loading ? (
          <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-10 bg-muted animate-pulse rounded" />)}</div>
        ) : err ? (
          <div className="text-destructive text-sm">{err}</div>
        ) : times ? (
          <div>
            {date && <div className="text-sm text-muted-foreground mb-3">{date} · {city}</div>}
            <div className="grid sm:grid-cols-5 gap-3">
              {PRAYERS.map((p) => (
                <div key={p} className="rounded-lg bg-card border border-border p-3 text-center">
                  <div className="text-xs uppercase text-muted-foreground">{p}</div>
                  <div className="text-xl font-bold text-foreground">{times[p]}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Result>
    </ToolLayout>
  );
}
