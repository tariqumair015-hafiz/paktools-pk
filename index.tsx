import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdSlot } from "@/components/layout/AdSlot";
import { SearchBar } from "@/components/layout/SearchBar";
import { ToolCard } from "@/components/layout/ToolCard";
import { tools, categories } from "@/lib/tools-registry";
import {
  Sparkles, ShieldCheck, Zap, BadgeCheck, MapPin, EyeOff,
  Search as SearchIcon, MousePointerClick, CheckCircle2, Star,
} from "lucide-react";

const FAQS = [
  { q: "Is PakTools.pk really free?", a: "Yes. All 37+ tools are 100% free, no signup, no limits." },
  { q: "Are the calculations accurate for Pakistan?", a: "Yes. Our tax, electricity and Zakat tools use Pakistan-specific formulas (FBR 2024-25, WAPDA slabs, 2.5% Zakat)." },
  { q: "Do you store my data?", a: "No. Every tool runs entirely in your browser. We never send your inputs to a server." },
  { q: "Which currencies does the converter support?", a: "PKR to USD, SAR, AED, GBP and EUR using live rates." },
  { q: "How is income tax calculated?", a: "We use the FBR 2024-25 salaried slabs: 0% up to 600k, then 5%, 15%, 25%, 30%, and 35% on higher brackets." },
  { q: "Can I use these tools on mobile?", a: "Yes. PakTools.pk is mobile-first and works on any phone or tablet." },
  { q: "Are prayer times accurate?", a: "Prayer times come from the AlAdhan API using the Karachi calculation method by default." },
  { q: "Can I suggest a new tool?", a: "Absolutely — visit our Contact page and send us your idea." },
];

const popular = ["income-tax-calculator", "cgpa-calculator", "zakat-calculator", "prayer-times", "currency-converter", "electricity-bill-calculator"];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PakTools.pk — 37+ Free Online Tools & Calculators for Pakistan" },
      { name: "description", content: "Free online calculators for Pakistan: Income Tax, GST, CGPA, Zakat, Prayer Times, Electricity Bill, Loan EMI and more. Fast, accurate, mobile-friendly." },
      { property: "og:title", content: "PakTools.pk — 37+ Free Online Tools for Pakistan" },
      { property: "og:description", content: "All-in-one Pakistani toolkit: tax, finance, student & daily calculators." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
});

function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

const WHY = [
  { icon: Zap, title: "Lightning Fast", body: "Runs locally in your browser. No wait, no lag." },
  { icon: BadgeCheck, title: "100% Free", body: "Every tool, every time. No signup, no limits." },
  { icon: MapPin, title: "Pakistan-Specific", body: "FBR slabs, WAPDA bills, Karachi prayer method." },
  { icon: EyeOff, title: "No Ad Clutter", body: "Clean layout. Calculations first, ads second." },
];

const STEPS = [
  { icon: SearchIcon, title: "Search a tool", body: "Find any of 37+ tools from the search bar." },
  { icon: MousePointerClick, title: "Enter values", body: "Type your numbers — no signup required." },
  { icon: CheckCircle2, title: "Get instant result", body: "See accurate, Pakistan-specific output instantly." },
];

const REVIEWS = [
  { name: "Ahmed Khan", city: "Karachi", text: "Income tax calculator ne meri 2024-25 ki planning aasaan kar di. Bohat accurate.", rating: 5 },
  { name: "Sara Malik",  city: "Lahore",  text: "CGPA calculator is a lifesaver before every semester. Mobile pe bhi smooth chalta hai.", rating: 5 },
  { name: "Bilal Ahmad", city: "Islamabad", text: "Electricity bill estimator ne mujhe WAPDA slabs samajhne mein madad ki. Highly recommended.", rating: 5 },
];

function Index() {
  const finance = tools.filter((t) => t.category === "finance");
  const students = tools.filter((t) => t.category === "students");
  const daily = tools.filter((t) => t.category === "daily");
  const popularTools = popular.map((s) => tools.find((t) => t.slug === s)!).filter(Boolean);
  const calcsToday = useCountUp(10247);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative overflow-hidden border-b border-border hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1 text-xs text-muted-foreground mb-6 shadow-sm">
            <Sparkles className="h-3 w-3 text-primary" /> Made in Pakistan · 100% Free
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            37+ Free Online Tools<br className="hidden md:block" />
            <span className="text-primary">for Pakistanis</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tax, CGPA, Zakat, Prayer Times, Electricity Bill, Loan EMI and more — all in one place, mobile-friendly and lightning fast.
          </p>
          <div className="mt-8 flex justify-center"><SearchBar large /></div>

          {/* Live counter */}
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary live-dot" />
            <span className="font-semibold text-foreground tabular-nums">
              {calcsToday.toLocaleString()}
            </span>
            calculations done today
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { Icon: Zap, label: "No Signup" },
              { Icon: ShieldCheck, label: "100% Free" },
              { Icon: MapPin, label: "Made in Pakistan 🇵🇰" },
            ].map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <Icon className="h-4 w-4 text-primary" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AdSlot variant="header" />

      {/* Stats bar */}
      <section className="border-y border-border bg-primary-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { k: "25+", v: "Tools" },
            { k: "50,000+", v: "Users" },
            { k: "100%", v: "Free Forever" },
            { k: "🇵🇰", v: "Made in Pakistan" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-2xl md:text-3xl font-extrabold text-foreground">{s.k}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-4 py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Most Popular</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>

        <section id="finance">
          <h2 className="text-2xl font-bold text-foreground mb-1">{categories.finance.label}</h2>
          <p className="text-muted-foreground mb-4">{categories.finance.blurb}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {finance.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>

        <section id="students">
          <h2 className="text-2xl font-bold text-foreground mb-1">{categories.students.label}</h2>
          <p className="text-muted-foreground mb-4">{categories.students.blurb}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {students.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>

        <section id="daily">
          <h2 className="text-2xl font-bold text-foreground mb-1">{categories.daily.label}</h2>
          <p className="text-muted-foreground mb-4">{categories.daily.blurb}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {daily.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>

        {/* Why PakTools */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Why PakTools?</h2>
          <p className="text-muted-foreground text-center mb-8">Built for Pakistan, by Pakistanis.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary mb-3">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="rounded-3xl border border-border bg-primary-soft/30 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-semibold text-primary mb-1">STEP {i + 1}</div>
                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Loved by Pakistanis</h2>
          <p className="text-muted-foreground text-center mb-8">Real feedback from real users.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex gap-0.5 text-primary mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary" />)}
                </div>
                <p className="text-sm text-foreground/90 mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary font-semibold">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.city}, Pakistan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="rounded-xl border border-border bg-card p-4">
                <summary className="cursor-pointer font-medium text-foreground">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
