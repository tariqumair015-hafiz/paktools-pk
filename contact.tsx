import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => pageHead("Contact", "Get in touch with PakTools.pk — feedback, tool suggestions and partnerships.", "/contact"),
});

function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mt-4 text-foreground/80">
          Have a tool suggestion, found a bug, or want to partner with us? We'd love to hear from you.
        </p>
        <a href="mailto:hello@paktools.pk" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-primary-foreground font-medium hover:opacity-90">
          <Mail className="h-4 w-4" /> hello@paktools.pk
        </a>
      </main>
      <Footer />
    </div>
  );
}
