import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";

const tool = toolBySlug("hijri-date-converter")!;
const FAQS = [
  { q: "Which Hijri calendar is used?", a: "The Umm al-Qura calendar via the AlAdhan API." },
  { q: "Why might dates differ?", a: "Different countries (Saudi Arabia, Pakistan) may sight the moon on different days, so dates can vary by 1 day." },
  { q: "Can I convert future dates?", a: "Yes — works for past, present and future dates." },
  { q: "Is this useful for Islamic events?", a: "Yes — find Gregorian dates for Ramadan, Eid, Muharram, etc." },
];

export const Route = createFileRoute("/hijri-date-converter")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const today = new Date();
  const fmt = (d: Date) => `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  const [date, setDate] = useState(today.toISOString().slice(0, 10));
  const [hijri, setHijri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const d = new Date(date);
    fetch(`https://api.aladhan.com/v1/gToH/${fmt(d)}`)
      .then((r) => r.json())
      .then((j) => {
        const h = j?.data?.hijri;
        if (h) setHijri(`${h.day} ${h.month.en} ${h.year} AH`);
      })
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <ToolLayout
      tool={tool}
      howTo={["Pick a Gregorian date.", "See the matching Hijri (Islamic) date."]}
      formula="Conversion via Umm al-Qura calendar (AlAdhan API)."
      description={tool.description + " Handy for tracking Islamic months, planning Umrah, or noting religious birthdays in both calendars."}
      faqs={FAQS}
    >
      <Field label="Gregorian date"><input className={inputCls} type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      <Result>
        {loading ? <div className="h-10 animate-pulse bg-muted rounded" /> : <Stat label="Hijri date" value={hijri || "—"} />}
      </Result>
    </ToolLayout>
  );
}
