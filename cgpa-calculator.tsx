import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { fmtNum } from "@/lib/formulas";
import { Trash2, Plus } from "lucide-react";

const tool = toolBySlug("cgpa-calculator")!;
const FAQS = [
  { q: "Is this for HEC universities?", a: "Yes — uses the 4.0 GPA scale used by most Pakistani universities (NUST, LUMS, COMSATS, FAST, UET etc.)." },
  { q: "How is CGPA calculated?", a: "CGPA = Σ(GPA × Credit Hours) ÷ Σ(Credit Hours)" },
  { q: "What grade is needed for First Division?", a: "Generally CGPA above 3.0 (out of 4.0) is considered very good." },
  { q: "Can I add as many courses as I want?", a: "Yes — add or remove rows as needed." },
];

const GRADES: Record<string, number> = { "A+": 4.0, A: 4.0, "A-": 3.67, "B+": 3.33, B: 3.0, "B-": 2.67, "C+": 2.33, C: 2.0, "C-": 1.67, D: 1.0, F: 0 };

interface Row { name: string; credits: string; grade: string }

export const Route = createFileRoute("/cgpa-calculator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [rows, setRows] = useState<Row[]>([
    { name: "Course 1", credits: "3", grade: "A" },
    { name: "Course 2", credits: "3", grade: "B+" },
    { name: "Course 3", credits: "3", grade: "A-" },
  ]);
  const update = (i: number, k: keyof Row, v: string) =>
    setRows(rows.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  const add = () => setRows([...rows, { name: `Course ${rows.length + 1}`, credits: "3", grade: "A" }]);
  const del = (i: number) => setRows(rows.filter((_, idx) => idx !== i));

  const totalCr = rows.reduce((s, r) => s + (parseFloat(r.credits) || 0), 0);
  const totalPts = rows.reduce((s, r) => s + (parseFloat(r.credits) || 0) * (GRADES[r.grade] ?? 0), 0);
  const cgpa = totalCr ? totalPts / totalCr : 0;

  return (
    <ToolLayout
      tool={tool}
      howTo={["Add each course with credit hours and your letter grade.", "Add or remove rows.", "CGPA updates instantly."]}
      formula="CGPA = Σ(GradePoints × Credits) ÷ Σ(Credits)"
      description={tool.description + " Works for semester GPA as well — just enter one semester's courses."}
      faqs={FAQS}
    >
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <input className={inputCls + " col-span-5"} value={r.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Course name" />
            <input className={inputCls + " col-span-3"} type="number" value={r.credits} onChange={(e) => update(i, "credits", e.target.value)} placeholder="Credits" />
            <select className={inputCls + " col-span-3"} value={r.grade} onChange={(e) => update(i, "grade", e.target.value)}>
              {Object.keys(GRADES).map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <button onClick={() => del(i)} className="col-span-1 inline-flex items-center justify-center h-11 rounded-md text-muted-foreground hover:text-destructive" aria-label="Remove">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button onClick={add} className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2">
          <Plus className="h-4 w-4" /> Add course
        </button>
      </div>
      <Result>
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Total credits" value={totalCr} />
          <Stat label="Grade points" value={fmtNum(totalPts, 2)} />
          <Stat label="CGPA" value={fmtNum(cgpa, 2) + " / 4.0"} />
        </div>
      </Result>
    </ToolLayout>
  );
}
