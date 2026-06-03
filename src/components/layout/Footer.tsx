import { Link } from "@tanstack/react-router";
import { Wrench, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="h-4 w-4" />
            </span>
            <span className="font-bold text-foreground">PakTools<span className="text-primary">.pk</span></span>
          </div>
          <p className="text-sm text-muted-foreground">
            37+ free online calculators built for Pakistan — Tax, CGPA, Zakat, Prayer Times and more.
          </p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-3 text-foreground">Tools</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to={"/$slug" as any} params={{ slug: "income-tax-calculator" } as any} className="hover:text-primary">Income Tax</Link></li>
            <li><Link to={"/$slug" as any} params={{ slug: "cgpa-calculator" } as any} className="hover:text-primary">CGPA Calculator</Link></li>
            <li><Link to={"/$slug" as any} params={{ slug: "zakat-calculator" } as any} className="hover:text-primary">Zakat Calculator</Link></li>
            <li><Link to={"/$slug" as any} params={{ slug: "prayer-times" } as any} className="hover:text-primary">Prayer Times</Link></li>
            <li><Link to={"/$slug" as any} params={{ slug: "electricity-bill-calculator" } as any} className="hover:text-primary">Electricity Bill</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-3 text-foreground">Company</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
          <div className="font-semibold mt-5 mb-3 text-foreground">Legal</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-semibold mb-3 text-foreground">Stay updated</div>
          <p className="text-muted-foreground mb-3">Get notified when we add new tools.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <button type="submit" className="rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition">
              Join
            </button>
          </form>
          {sent && <p className="mt-2 text-xs text-primary">Thanks! We'll be in touch.</p>}
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2025 PakTools.pk · Made in Pakistan 🇵🇰 · Last updated: 2025
      </div>
    </footer>
  );
}
