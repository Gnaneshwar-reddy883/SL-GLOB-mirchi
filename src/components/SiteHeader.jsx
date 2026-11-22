import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Code2, Menu as MenuIcon, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useTheme } from "@/lib/ThemeContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Reservation", to: "/reservation" },
  { label: "Contact", to: "/contact" },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const { count, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setMobileOpen(false)}>
          <span className="text-xl" aria-hidden="true">🌶️</span>
          <span className="font-heading text-2xl font-semibold tracking-tight text-primary">Mirchi</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                  active
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-secondary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            to="/php-source"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary lg:inline-flex"
          >
            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
            PHP Source
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Order</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-[0.7rem] font-semibold text-secondary-foreground">
              {count}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="rounded-full p-2 text-foreground md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav aria-label="Mobile" className="border-t border-border bg-background px-6 py-3 md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3 py-2.5 text-sm ${
                    pathname === link.to
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/php-source"
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground"
              >
                PHP Source
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}