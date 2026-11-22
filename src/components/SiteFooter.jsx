import { Link } from "@tanstack/react-router";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl" aria-hidden="true">🌶️</span>
            <span className="font-heading text-2xl font-semibold text-primary">Mirchi</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A family-run Indian kitchen in Kolkata. Tandoori starters, handi curries, biryani and
            mithai, served the way we eat at home.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
            <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
            <li><Link to="/reservation" className="hover:text-primary">Book a Table</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/php-source" className="hover:text-primary">PHP Source Code</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            Visit
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>12 Chowringhee Lane, Kolkata 700016</li>
            <li>
              <a href="tel:+919830012345" className="hover:text-primary">+91 98300 12345</a>
            </li>
            <li>
              <a href="mailto:hello@mirchi.example" className="hover:text-primary">
                hello@mirchi.example
              </a>
            </li>
            <li>Open daily, 12:00 pm – 11:00 pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mirchi Indian Kitchen. College scripting lab project.</p>
          <p>HTML · CSS · JavaScript · PHP</p>
        </div>
      </div>
    </footer>
  );
}