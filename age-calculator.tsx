import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";

const tool = toolBySlug("age-calculator")!;
const FAQS = [
  { q: "Is the calculation exact?", a: "Yes — it accounts for actual days in each month, including leap years." },
  { q: "Can I check age on a future date?", a: "Change the 'As of' date to any future or past date." },
  { q: "Why do I need exact age?", a: "Useful for CNIC applications, school admissions, passport forms or visa applications." },
  { q: "Does it work for very young children?", a: "Yes — newborns will show 0 years, with months and days." },
];

function diff(d1: Date, d2: Date) {
  let y = d2.getFullYear() - d1.getFullYear();
  let m = d2.getMonth() - d1.getMonth();
  let d = d2.getDate() - d1.getDate();
  if (d < 0) { m -= 1; d += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
  if (m < 0) { y -= 1; m += 12; }
  const totalDays = Math.floor((d2.getTime() - d1.getTime()) / 86400000);
  return { y, m, d, totalDays };
}

export const Route = createFileRoute("/age-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const today = new Date().toISOString().slice(0, 10);
  const [dob, setDob] = useState("2000-01-01");
  const [as, setAs] = useState(today);
  const valid = dob && as && new Date(dob) <= new Date(as);
  const r = valid ? diff(new Date(dob), new Date(as)) : { y: 0, m: 0, d: 0, totalDays: 0 };
  return (
    <ToolLayout
      tool={tool}
      howTo={["Enter your date of birth.", "Optionally change the 'As of' date.", "See exact age."]}
      formula="Age = AsOfDate − DateOfBirth (in years, months, days)"
      description={tool.description + " Commonly used for CNIC, NADRA forms, school admissions and visa applications in Pakistan."}
      faqs={FAQS}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Date of birth"><input className={inputCls} type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></Field>
        <Field label="As of"><input className={inputCls} type="date" value={as} onChange={(e) => setAs(e.target.value)} /></Field>
      </div>
      <Result>
        <div className="grid sm:grid-cols-4 gap-4">
          <Stat label="Years" value={r.y} />
          <Stat label="Months" value={r.m} />
          <Stat label="Days" value={r.d} />
          <Stat label="Total days" value={r.totalDays} />
        </div>
      </Result>
    </ToolLayout>
  );
}
