import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { tools } from "@/lib/tools-registry";

export function SearchBar({ large = false }: { large?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(s) ||
        (t.short?.toLowerCase().includes(s) ?? false) ||
        (t.keywords?.toLowerCase().includes(s) ?? false)
    ).slice(0, 8);
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={`relative w-full ${large ? "max-w-2xl" : "max-w-md"}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search 37+ tools — GST, CGPA, Zakat…"
          className={`w-full rounded-lg border border-border bg-card pl-10 pr-3 ${large ? "h-12 text-base" : "h-10 text-sm"} text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring`}
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
          {results.map((t) => (
            <Link
              key={t.slug}
              to={"/$slug" as any}
              params={{ slug: t.slug } as any}
              onClick={() => { setOpen(false); setQ(""); }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent text-popover-foreground"
            >
              <t.icon className="h-4 w-4 text-primary" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground truncate">{t.short}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
