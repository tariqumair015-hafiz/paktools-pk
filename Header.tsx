import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Wrench, Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { location } = useRouterState();
  const path = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [path]);

  const navLink = (active: boolean) =>
    cn(
      "px-3 py-2 rounded-md text-sm transition-colors",
      active ? "text-primary font-semibold bg-primary-soft" : "text-foreground hover:bg-accent"
    );

  const mobileLink = (active: boolean) =>
    cn(
      "block px-4 py-3 rounded-md text-base transition-colors",
      active ? "text-primary font-semibold bg-primary-soft" : "text-foreground hover:bg-accent"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all",
        scrolled ? "nav-scrolled" : "bg-background border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-card)]">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="font-bold text-lg text-foreground">
            PakTools<span className="text-primary">.pk</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/" className={navLink(path === "/")}>Home</Link>
          <a href="/#finance" className={navLink(false)}>Finance</a>
          <a href="/#students" className={navLink(false)}>Students</a>
          <a href="/#daily" className={navLink(false)}>Daily Use</a>
          <Link to="/blog" className={navLink(path.startsWith("/blog"))}>Blog</Link>
          <Link to="/about" className={navLink(path.startsWith("/about"))}>About</Link>
        </nav>

        <div className="flex-1 flex justify-end items-center gap-3">
          <div className="hidden sm:block flex-1 max-w-md"><SearchBar /></div>
          <ThemeToggle />
          <button
            className="lg:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="sm:hidden px-4 pb-3"><SearchBar /></div>

      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-3 space-y-1 shadow-md">
          <Link to="/" className={mobileLink(path === "/")}>Home</Link>
          <a href="/#finance" className={mobileLink(false)} onClick={() => setMenuOpen(false)}>Finance</a>
          <a href="/#students" className={mobileLink(false)} onClick={() => setMenuOpen(false)}>Students</a>
          <a href="/#daily" className={mobileLink(false)} onClick={() => setMenuOpen(false)}>Daily Use</a>
          <Link to="/blog" className={mobileLink(path.startsWith("/blog"))}>Blog</Link>
          <Link to="/about" className={mobileLink(path.startsWith("/about"))}>About</Link>
        </div>
      )}
    </header>
  );
}
