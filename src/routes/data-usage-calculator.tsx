import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result, Stat } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { fmtNum } from "@/lib/formulas";

const tool = { slug: "data-usage-calculator", name: "Mobile Data Usage Calculator", description: "Calculate how much mobile internet data you use daily and monthly in Pakistan.", icon: "📶", category: "daily" as const };

const FAQS = [
  { q: "How much data does WhatsApp use?", a: "WhatsApp text messages use very little data. Voice calls use about 1 MB/minute. Video calls use 5-8 MB/minute." },
  { q: "How much data does YouTube use?", a: "YouTube at 480p uses about 300 MB/hour. At 1080p it uses 1.5-3 GB/hour." },
  { q: "Which Pakistani network has best data packages?", a: "Jazz, Telenor, Ufone and Zong all offer competitive data packages. Compare based on your area's network coverage." },
  { q: "How to check remaining data balance?", a: "Jazz: *114#, Telenor: *999#, Ufone: *706#, Zong: *102#" },
];

const ACTIVITIES = [
  { name: "WhatsApp Messages", mbPerHour: 1, icon: "💬" },
  { name: "WhatsApp Voice Call", mbPerHour: 60, icon: "📞" },
  { name: "WhatsApp Video Call", mbPerHour: 400, icon: "📹" },
  { name: "YouTube (480p)", mbPerHour: 300, icon: "▶️" },
  { name: "YouTube (1080p)", mbPerHour: 1500, icon: "🎬" },
  { name: "TikTok / Reels", mbPerHour: 500, icon: "🎵" },
  { name: "Facebook Browsing", mbPerHour: 80, icon: "👍" },
  { name: "Instagram", mbPerHour: 150, icon: "📸" },
  { name: "Online Gaming", mbPerHour: 40, icon: "🎮" },
  { name: "Music Streaming", mbPerHour: 60, icon: "🎶" },
];

export const Route = createFileRoute("/data-usage-calculator")({ component: Page, head: () => toolHead(tool, FAQS) });

function Page() {
  const [hours, setHours] = useState<Record<string, string>>({});

  const totalMB = ACTIVITIES.reduce((sum, act) => {
    const h = parseFloat(hours[act.name] || "0") || 0;
    return sum + h * act.mbPerHour;
  }, 0);

  const totalGB = totalMB / 1024;
  const monthlyGB = totalGB * 30;
  const monthlyMB = totalMB * 30;

  return (
    <ToolLayout tool={tool}
      howTo={["Enter daily hours for each activity.", "See total daily and monthly data usage.", "Compare with your mobile package."]}
      formula="Daily Data = Σ (Hours × MB per Hour for each activity)"
      description="Calculate your exact mobile internet data consumption in Pakistan. Find out how much data WhatsApp, YouTube, TikTok and other apps use per day and month."
      faqs={FAQS}>
      <div className="space-y-3">
        {ACTIVITIES.map(act => (
          <div key={act.name} className="flex items-center gap-3">
            <span className="text-xl w-8">{act.icon}</span>
            <span className="flex-1 text-sm text-foreground">{act.name}</span>
            <span className="text-xs text-muted-foreground w-20 text-right">{act.mbPerHour < 1024 ? `${act.mbPerHour} MB/hr` : `${(act.mbPerHour/1024).toFixed(1)} GB/hr`}</span>
            <input
              className={inputCls + " w-24 text-sm"}
              type="number"
              value={hours[act.name] || ""}
              onChange={e => setHours(prev => ({ ...prev, [act.name]: e.target.value }))}
              placeholder="hrs/day"
              min="0"
              max="24"
              step="0.5"
            />
          </div>
        ))}
      </div>
      {totalMB > 0 && (
        <Result>
          <div className="grid sm:grid-cols-2 gap-4">
            <Stat label="Daily Usage" value={totalGB >= 1 ? `${fmtNum(totalGB, 2)} GB` : `${fmtNum(totalMB)} MB`} />
            <Stat label="Monthly Usage" value={monthlyGB >= 1 ? `${fmtNum(monthlyGB, 1)} GB` : `${fmtNum(monthlyMB)} MB`} />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            💡 You need a <strong>{monthlyGB < 5 ? "5 GB" : monthlyGB < 15 ? "15 GB" : monthlyGB < 30 ? "30 GB" : "Unlimited"}</strong> monthly package.
          </div>
        </Result>
      )}
    </ToolLayout>
  );
}
