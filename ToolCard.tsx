import { Link } from "@tanstack/react-router";
import { Sparkles, Users } from "lucide-react";
import type { ToolMeta } from "@/lib/tools-registry";

function formatUsage(n?: number) {
  if (!n) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k+`;
  return `${n}+`;
}

export function ToolCard({ tool }: { tool: ToolMeta }) {
  const Icon = tool.icon;
  const usage = formatUsage(tool.usage);
  return (
    <Link
      to={"/$slug" as any}
      params={{ slug: tool.slug } as any}
      className="tool-card group relative rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:border-primary/60"
    >
      {tool.popular && (
        <span className="absolute -top-2 right-4 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow">
          <Sparkles className="h-3 w-3" /> Popular
        </span>
      )}
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground transition shadow-sm">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="font-semibold text-foreground leading-tight">{tool.name}</h3>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">{tool.short}</p>
      {usage && (
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3 w-3 text-primary" />
          Used {usage} times
        </div>
      )}
    </Link>
  );
}
