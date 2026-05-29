import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";

const tool = { slug: "matric-result-calculator", name: "Matric/Inter Result Calculator", description: "Calculate your Matric or Inter percentage, grade and division for all Pakistani boards.", icon: "🎓", category: "students" as const };

const FAQS = [
  { q: "How is matric percentage calculated in Pakistan?", a: "Percentage = (Obtained Marks / Total Marks) × 100. For matric the total marks are usually 1100." },
  { q: "What are the divisions in Pakistan board exams?", a: "A1 Grade (90%+), A Grade (80-89%), B Grade (70-79%), C Grade (60-69%), D Grade (50-59%), Fail (below 33%)." },
  { q: "What is the passing marks in matric Pakistan?", a: "You need minimum 33% in each subject and overall to pass." },
  { q: "How many subjects are in matric?", a: "Matric (SSC) has 8-9 subjects depending on the group (Science/Arts)." },
];

type Subject = { name: string; obtained: string; total: string };

export const Route = createFileRoute("/matric-result-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [examType, setExamType] = useState<"matric"|"inter">("matric");
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "Urdu", obtained: "", total: "100" },
    { name: "English", obtained: "", total: "100" },
    { name: "Mathematics", obtained: "", total: "100" },
    { name: "Science", obtained: "", total: "100" },
    { name: "Pakistan Studies", obtained: "", total: "75" },
    { name: "Islamiyat", obtained: "", total: "75" },
    { name: "Elective 1", obtained: "", total: "100" },
    { name: "Elective 2", obtained: "", total: "100" },
  ]);

  const updateSubject = (i: number, field: keyof Subject, val: string) => {
    const updated = [...subjects];
    updated[i] = { ...updated[i], [field]: val };
    setSubjects(updated);
  };

  const totalObtained = subjects.reduce((s, sub) => s + (parseFloat(sub.obtained) || 0), 0);
  const totalMarks = subjects.reduce((s, sub) => s + (parseFloat(sub.total) || 0), 0);
  const percentage = totalMarks > 0 ? (totalObtained / totalMarks * 100) : 0;

  const getGrade = (pct: number) => {
    if (pct >= 90) return { grade: "A1", division: "First (Distinction)", color: "#16a34a" };
    if (pct >= 80) return { grade: "A", division: "First Division", color: "#16a34a" };
    if (pct >= 70) return { grade: "B", division: "Second Division", color: "#2563eb" };
    if (pct >= 60) return { grade: "C", division: "Second Division", color: "#2563eb" };
    if (pct >= 50) return { grade: "D", division: "Third Division", color: "#d97706" };
    if (pct >= 33) return { grade: "E", division: "Pass", color: "#d97706" };
    return { grade: "F", division: "Fail", color: "#dc2626" };
  };

  const { grade, division, color } = getGrade(percentage);

  return (
    <ToolLayout tool={tool}
      howTo={["Select exam type (Matric or Inter).", "Enter obtained marks for each subject.", "See your percentage, grade and division."]}
      formula="Percentage = (Total Obtained Marks / Total Marks) × 100"
      description="Calculate your Matric (SSC) or Inter (HSSC) exam result percentage, grade and division for all Pakistani boards including Punjab, Sindh, KPK, Balochistan."
      faqs={FAQS}>
      <Field label="Exam Type">
        <select className={inputCls} value={examType} onChange={e => setExamType(e.target.value as "matric"|"inter")}>
          <option value="matric">Matric (SSC)</option>
          <option value="inter">Intermediate (HSSC)</option>
        </select>
      </Field>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-medium">Subject</th>
              <th className="text-left py-2 text-muted-foreground font-medium">Obtained</th>
              <th className="text-left py-2 text-muted-foreground font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-2 pr-2">
                  <input className={inputCls + " text-sm"} value={sub.name} onChange={e => updateSubject(i, "name", e.target.value)} />
                </td>
                <td className="py-2 pr-2">
                  <input className={inputCls + " text-sm"} type="number" value={sub.obtained} onChange={e => updateSubject(i, "obtained", e.target.value)} placeholder="0" />
                </td>
                <td className="py-2">
                  <input className={inputCls + " text-sm"} type="number" value={sub.total} onChange={e => updateSubject(i, "total", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalObtained > 0 && (
        <Result>
          <div className="grid sm:grid-cols-2 gap-4">
            <Stat label="Total Obtained" value={`${totalObtained} / ${totalMarks}`} />
            <Stat label="Percentage" value={`${percentage.toFixed(2)}%`} />
            <div className="metric">
              <div className="label text-xs text-muted-foreground">Grade</div>
              <div className="value text-2xl font-bold" style={{ color }}>{grade}</div>
            </div>
            <div className="metric">
              <div className="label text-xs text-muted-foreground">Division</div>
              <div className="value text-lg font-semibold" style={{ color }}>{division}</div>
            </div>
          </div>
        </Result>
      )}
    </ToolLayout>
  );
}
