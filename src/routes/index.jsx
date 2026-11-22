import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { menuItems } from "@/data/menu-data";
import DishCard from "@/components/DishCard";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mirchi | Indian Kitchen in Kolkata" },
      {
        name: "description",
        content:
          "Tandoori starters, slow-cooked handi curries, Hyderabadi biryani and fresh mithai in the heart of Kolkata.",
      },
    ],
  }),
  component: HomePage,
});

const highlights = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    text: "Vegetables from the morning market, paneer made in our own kitchen, and whole spices ground every week.",
  },
  {
    icon: "🔥",
    title: "Authentic Recipes",
    text: "Family recipes from Kolkata and Hyderabad, cooked in clay tandoors and heavy handis on a slow flame.",
  },
  {
    icon: "🏠",
    title: "Family Owned",
    text: "The same family has run this kitchen since 1998. Most evenings, one of us is on the floor.",
  },
];

function HomePage() {
  const featured = menuItems.filter((dish) => dish.special).slice(0, 3);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(245,158,11,0.55), transparent 42%), radial-gradient(circle at 88% 78%, rgba(245,158,11,0.32), transparent 48%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.42em] text-secondary">
              Kolkata · Since 1998
            </p>
            <h1 className="mt-5 font-heading text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
              Mirchi
            </h1>
            <p className="mt-5 max-w-md font-heading text-2xl italic leading-snug text-primary-foreground/85 md:text-3xl">
              Bold spices, slow-cooked memories.
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-primary-foreground/70">
              A small family kitchen serving tandoori starters, handi curries, Hyderabadi biryani
              and mithai made fresh every evening.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Menu
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-foreground/10"
              >
                Book a Table
              </Link>
            </div>
          </div>

          {/* A little menu card, tilted, listing today's specials */}
          <div className="hidden md:block">
            <div className="mx-auto w-full max-w-xs rotate-2 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-7 backdrop-blur-sm">
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-secondary">
                Today at Mirchi
              </p>
              <ul className="mt-5 space-y-4">
                {featured.map((dish) => (
                  <li
                    key={dish.name}
                    className="flex items-baseline justify-between gap-4 border-b border-primary-foreground/10 pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-primary-foreground/90">{dish.name}</span>
                    <span className="font-heading text-secondary">₹{dish.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-heading text-base italic text-primary-foreground/65">
                “Cooked fresh, served warm.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(59,36,24,0.5)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-2xl">
                  {item.icon}
                </div>
                <h2 className="mt-5 font-heading text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED DISHES ---------------- */}
      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-primary">
                From the kitchen
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
                This week&apos;s favourites
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
            >
              See the full menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((dish, index) => (
              <Reveal key={dish.name} delay={index * 90}>
                <DishCard dish={dish} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- VISIT STRIP ---------------- */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-3 md:p-10">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-base font-semibold">Find us</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  12 Chowringhee Lane, Kolkata 700016
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-base font-semibold">Opening hours</h3>
                <p className="mt-1 text-sm text-muted-foreground">Every day, 12:00 pm – 11:00 pm</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-base font-semibold">Reservations</h3>
                <p className="mt-1 text-sm text-muted-foreground">+91 98300 12345</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}