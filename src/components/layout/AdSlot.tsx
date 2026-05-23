import { cn } from "@/lib/utils";

type Variant = "header" | "sidebar" | "below" | "mobile";

const SIZES: Record<Variant, { id: string; w: string; h: string; label: string; cls: string }> = {
  header:  { id: "ad-header",  w: "728", h: "90",  label: "Header Banner 728x90",     cls: "h-[90px] max-w-[728px] mx-auto hidden md:flex" },
  sidebar: { id: "ad-sidebar", w: "300", h: "250", label: "Sidebar 300x250",          cls: "h-[250px] w-[300px] hidden lg:flex" },
  below:   { id: "ad-result",  w: "336", h: "280", label: "Below Result 336x280",     cls: "h-[280px] max-w-[336px] mx-auto flex" },
  mobile:  { id: "ad-mobile",  w: "320", h: "50",  label: "Mobile Sticky 320x50",     cls: "h-[50px] w-[320px] mx-auto flex md:hidden" },
};

export function AdSlot({ variant, className }: { variant: Variant; className?: string }) {
  const s = SIZES[variant];
  return (
    <div
      id={s.id}
      className={cn(
        "ad-slot items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-xs text-muted-foreground my-4",
        s.cls,
        className
      )}
      data-ad-slot={variant}
      aria-label={`Advertisement ${s.label}`}
    >
      {/* AdSense {s.w}x{s.h} */}
      Ad space · {s.label}
    </div>
  );
}

/** Mobile sticky 320x50 — fixed to bottom of viewport on small screens */
export function MobileStickyAd() {
  return (
    <div
      id="ad-mobile"
      className="ad-slot fixed bottom-0 inset-x-0 z-40 flex md:hidden items-center justify-center h-[60px] border-t border-border bg-card/95 backdrop-blur text-xs text-muted-foreground"
      data-ad-slot="mobile"
      aria-label="Advertisement Mobile Sticky 320x50"
    >
      {/* AdSense 320x50 */}
      Ad space · 320×50
    </div>
  );
}
