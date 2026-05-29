import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Field, inputCls, Result } from "@/components/ui/ToolField";
import { toolHead } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools-registry";
import { Copy, RefreshCw } from "lucide-react";

const tool = toolBySlug("password-generator")!;
const FAQS = [
  { q: "Are these passwords stored anywhere?", a: "No — they're generated in your browser and never sent to any server." },
  { q: "How long should my password be?", a: "At least 12 characters. 16+ is recommended for important accounts." },
  { q: "Should I include symbols?", a: "Yes — it dramatically increases strength against brute-force attacks." },
  { q: "Can I use this for banking?", a: "Yes — generated passwords are strong, but always type them manually for sensitive accounts." },
];

function gen(len: number, opts: { upper: boolean; lower: boolean; nums: boolean; sym: boolean }): string {
  let chars = "";
  if (opts.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (opts.lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (opts.nums) chars += "0123456789";
  if (opts.sym) chars += "!@#$%^&*()-_=+[]{};:,.<>?";
  if (!chars) return "";
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => chars[n % chars.length]).join("");
}

export const Route = createFileRoute("/password-generator")({
  component: Page,
  head: () => toolHead(tool, FAQS),
});

function Page() {
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, sym: true });
  const [pwd, setPwd] = useState(() => gen(16, { upper: true, lower: true, nums: true, sym: true }));
  const regen = () => setPwd(gen(len, opts));
  return (
    <ToolLayout
      tool={tool}
      howTo={["Choose length.", "Pick character types.", "Copy the generated password."]}
      formula="Random selection from chosen character pool using crypto.getRandomValues."
      description={tool.description + " Use a unique password for every account and store them in a password manager like Bitwarden or 1Password."}
      faqs={FAQS}
    >
      <Field label={`Length: ${len}`}>
        <input className="w-full accent-primary" type="range" min={8} max={64} value={len} onChange={(e) => setLen(parseInt(e.target.value))} />
      </Field>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {Object.keys(opts).map((k) => (
          <label key={k} className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={(opts as any)[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="accent-primary" />
            {k === "upper" ? "Uppercase" : k === "lower" ? "Lowercase" : k === "nums" ? "Numbers" : "Symbols"}
          </label>
        ))}
      </div>
      <Result>
        <div className="flex items-center gap-2">
          <code className="flex-1 break-all font-mono text-base text-foreground bg-card px-3 py-2 rounded-md border border-border">{pwd}</code>
          <button onClick={() => navigator.clipboard.writeText(pwd)} className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-border hover:bg-accent" aria-label="Copy"><Copy className="h-4 w-4" /></button>
          <button onClick={regen} className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground" aria-label="Regenerate"><RefreshCw className="h-4 w-4" /></button>
        </div>
      </Result>
    </ToolLayout>
  );
}
