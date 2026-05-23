import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  component: Disclaimer,
  head: () => pageHead("Disclaimer", "PakTools.pk disclaimer — accuracy and use of our calculators.", "/disclaimer"),
});

function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 space-y-4 text-foreground/85">
        <h1 className="text-3xl font-bold text-foreground">Disclaimer</h1>
        <p>The calculators on PakTools.pk are provided for general informational purposes only. While we strive to keep all formulas and rates accurate and up to date (FBR tax slabs, WAPDA tariffs, currency rates, prayer times, etc.), we make no warranties about completeness, reliability or accuracy.</p>
        <p>For tax filings, legal matters, financial decisions or religious obligations, please consult a qualified professional or scholar. PakTools.pk is not liable for any loss or damage arising from use of this website.</p>
      </main>
      <Footer />
    </div>
  );
}
