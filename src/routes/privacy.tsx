import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => pageHead("Privacy Policy", "PakTools.pk privacy policy — what data we collect and how it's used.", "/privacy"),
});

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 space-y-4 text-foreground/85">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p>Effective date: January 2025</p>
        <h2 className="text-xl font-semibold text-foreground mt-6">1. What we collect</h2>
        <p>PakTools.pk does not require an account. All calculators run inside your browser. We do not store your inputs or results on our servers.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6">2. Analytics</h2>
        <p>We use Google Analytics to understand aggregate traffic patterns. This may include your IP address, browser type and pages visited. No personally identifiable information is collected.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6">3. Advertising</h2>
        <p>This site is supported by Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on prior visits. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary underline">Google Ads Settings</a>.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6">4. Third-party APIs</h2>
        <p>The Currency Converter and Prayer Times use public APIs (exchangerate-api.com and aladhan.com). When you use these tools your browser sends a request directly to those services.</p>
        <h2 className="text-xl font-semibold text-foreground mt-6">5. Contact</h2>
        <p>Questions about this policy? Email hello@paktools.pk.</p>
      </main>
      <Footer />
    </div>
  );
}
