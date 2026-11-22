import { createFileRoute, Link } from "@tanstack/react-router";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | Mirchi" },
      {
        name: "description",
        content:
          "Mirchi started in 1998 with one clay oven off Chowringhee Lane. Three generations later, the family still runs the kitchen.",
      },
    ],
  }),
  component: AboutPage,
});

const facts = [
  ["1998", "the first tandoor is fired"],
  ["30 dishes", "on the menu today"],
  ["Two kitchens", "tandoor and handi"],
  ["Open daily", "12:00 pm to 11:00 pm"],
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Since 1998" title="Our Story" text="Three generations, one kitchen." />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_0.6fr] md:py-20">
        <Reveal>
          <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground">
            <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
              It started with one clay oven
            </h2>
            <p>
              In 1998 our grandmother rented a single room off Chowringhee Lane with enough space
              for one tandoor and two tables. She cooked what she knew: the food of a Bengali
              kitchen, and the food of the Hyderabad family she married into.
            </p>
            <p>
              Twenty-five years later the room has become a proper restaurant, but very little else
              has changed. We still grind our masalas every week. We still make paneer in the
              morning. We still finish the biryani on dum, sealed with dough, because that is the
              only way it tastes right.
            </p>
            <p>
              Our parents run the kitchen, we run the floor, and on Sunday evenings the
              grandchildren help carry plates. If you come often enough, you will learn all our
              names.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside className="rounded-3xl border border-border bg-card p-7">
            <h2 className="font-heading text-lg font-semibold">Mirchi at a glance</h2>
            <ul className="mt-4 divide-y divide-border">
              {facts.map(([value, label]) => (
                <li key={value} className="flex flex-col gap-0.5 py-3">
                  <span className="font-heading text-base font-semibold text-primary">{value}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/reservation"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a Table
            </Link>
          </aside>
        </Reveal>
      </section>
    </>
  );
}