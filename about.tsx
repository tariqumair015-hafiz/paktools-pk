import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => pageHead("About", "About PakTools.pk — a free online toolkit built for Pakistanis.", "/about"),
});

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 prose prose-neutral dark:prose-invert">
        <h1 className="text-3xl font-bold text-foreground">About PakTools.pk</h1>
        <p className="text-foreground/80 mt-4">
          PakTools.pk is a free online toolkit built specifically for Pakistan. We started this project to give students,
          freelancers, small business owners and everyday users a fast, no-nonsense place to do common calculations
          — tax, GST, CGPA, Zakat, electricity bills, prayer times and more.
        </p>
        <p className="text-foreground/80 mt-4">
          Every tool runs entirely in your browser. We don't store your data, and we don't require signups. The site is mobile-first,
          lightweight and works on any device or network speed.
        </p>
        <p className="text-foreground/80 mt-4">
          Our formulas use the latest Pakistan-specific values: FBR 2024-25 salaried tax slabs, WAPDA domestic
          electricity tariffs, and the standard 2.5% Zakat rate. We keep these up to date as policies change.
        </p>
      </main>
      <Footer />
    </div>
  );
}
