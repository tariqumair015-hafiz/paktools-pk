import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";

const tool = { slug: "sleep-calculator", name: "Sleep Calculator", description: "Calculate best bedtime or wake up time based on sleep cycles. Wake up refreshed every morning.", icon: "😴", category: "daily" as const };

const FAQS = [
  { q: "How many hours of sleep do I need?", a: "Adults need 7-9 hours. Teenagers need 8-10 hours. Children need 9-12 hours of sleep." },
  { q: "What is a sleep cycle?", a: "One sleep cycle is approximately 90 minutes. Waking up at the end of a cycle makes you feel more refreshed." },
  { q: "What time should I sleep for Fajr?", a: "For Fajr at 5 AM, sleeping at 9:30 PM, 11 PM or 12:30 AM gives you complete sleep cycles." },
  { q: "Is 6 hours of sleep enough?", a: "6 hours is below the recommended 7-9 hours for adults. Chronic sleep deprivation affects health and performance." },
];

export const Route = createFileRoute("/sleep-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [mode, setMode] = useState<"wakeup"|"bedtime">("wakeup");
  const [time, setTime] = useState("06:00");
  const [fallAsleep, setFallAsleep] = useState("14");

  const CYCLE = 90; // minutes
  const CYCLES = [6, 5, 4, 3];

  const calculateTimes = () => {
    const [h, m] = time.split(":").map(Number);
    const baseMinutes = h * 60 + m;
    const fallAsleepMin = parseInt(fallAsleep) || 14;

    return CYCLES.map(cycles => {
      const totalSleep = cycles * CYCLE;
      let resultMinutes: number;

      if (mode === "wakeup") {
        resultMinutes = baseMinutes - totalSleep - fallAsleepMin;
      } else {
        resultMinutes = baseMinutes + totalSleep + fallAsleepMin;
      }

      let normalized = ((resultMinutes % 1440) + 1440) % 1440;
      const rh = Math.floor(normalized / 60);
      const rm = normalized % 60;
      const period = rh < 12 ? "AM" : "PM";
      const displayH = rh === 0 ? 12 : rh > 12 ? rh - 12 : rh;

      return {
        time: `${displayH}:${rm.toString().padStart(2, "0")} ${period}`,
        cycles,
        hours: (totalSleep / 60).toFixed(1),
        quality: cycles >= 5 ? "Excellent 😊" : cycles === 4 ? "Good 🙂" : "Minimum 😐"
      };
    });
  };

  const times = calculateTimes();

  return (
    <ToolLayout tool={tool}
      howTo={[`Select mode: "${mode === "wakeup" ? "Wake up time → find bedtime" : "Bedtime → find wake up time"}".`, "Enter your time.", "Choose from the suggested times."]}
      formula="Sleep Cycles × 90 minutes + 14 minutes (fall asleep time) = Total Sleep Time"
      description="Calculate the perfect bedtime or wake up time based on 90-minute sleep cycles. Wake up feeling refreshed by timing your alarm with natural sleep rhythms."
      faqs={FAQS}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Mode">
          <select className={inputCls} value={mode} onChange={e => setMode(e.target.value as "wakeup"|"bedtime")}>
            <option value="wakeup">I want to wake up at...</option>
            <option value="bedtime">I am going to sleep at...</option>
          </select>
        </Field>
        <Field label={mode === "wakeup" ? "Wake Up Time" : "Bedtime"}>
          <input className={inputCls} type="time" value={time} onChange={e => setTime(e.target.value)} />
        </Field>
        <Field label="Time to Fall Asleep (minutes)">
          <select className={inputCls} value={fallAsleep} onChange={e => setFallAsleep(e.target.value)}>
            <option value="7">7 minutes (fast sleeper)</option>
            <option value="14">14 minutes (average)</option>
            <option value="20">20 minutes (slow sleeper)</option>
          </select>
        </Field>
      </div>
      <Result>
        <p className="text-sm text-muted-foreground mb-3">
          {mode === "wakeup" ? `If you want to wake up at ${time}, go to sleep at:` : `If you sleep at ${time}, wake up at:`}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {times.map((t, i) => (
            <div key={i} className={`rounded-lg p-4 border ${i === 0 ? "border-primary bg-primary/5" : "border-border"}`}>
              <div className="text-xl font-bold text-foreground">{t.time}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.cycles} cycles · {t.hours}h · {t.quality}</div>
            </div>
          ))}
        </div>
      </Result>
    </ToolLayout>
  );
}
