import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => pageHead("Blog", "PakTools.pk blog — guides on Pakistani tax, finance, education and daily life.", "/blog"),
});

function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-foreground">Blog</h1>
        <p className="mt-4 text-muted-foreground">
          Coming soon — guides on Pakistani tax filing, student life, Zakat, electricity savings and more.
        </p>
      </main>
      <Footer />
    </div>
  );
}
