import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Mirchi" },
      {
        name: "description",
        content:
          "Find Mirchi at 12 Chowringhee Lane, Kolkata. Phone, email and opening hours for every day of the week.",
      },
    ],
  }),
  component: ContactPage,
});

const hours = [
  ["Monday – Thursday", "12:00 pm – 11:00 pm"],
  ["Friday – Saturday", "12:00 pm – 12:00 am"],
  ["Sunday", "12:00 pm – 10:30 pm"],
];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Park Street"
        title="Visit Us"
        text="We are a short walk from Park Street metro. Walk-ins are welcome, but a table booked ahead is a table kept."
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 md:py-20">
        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="font-heading text-lg font-semibold">Address</h2>
          <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <address className="not-italic leading-relaxed">
              12 Chowringhee Lane
              <br />
              Kolkata 700016
              <br />
              West Bengal, India
            </address>
          </div>

          <h2 className="mt-7 font-heading text-lg font-semibold">Phone</h2>
          <div className="mt-3 flex gap-3 text-sm">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <a href="tel:+919830012345" className="text-muted-foreground hover:text-primary">
              +91 98300 12345
            </a>
          </div>

          <h2 className="mt-7 font-heading text-lg font-semibold">Email</h2>
          <div className="mt-3 flex gap-3 text-sm">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <a href="mailto:hello@mirchi.example" className="text-muted-foreground hover:text-primary">
              hello@mirchi.example
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7">
          <h2 className="font-heading text-lg font-semibold">Opening hours</h2>
          <table className="mt-4 w-full border-collapse text-sm">
            <caption className="sr-only">Opening hours by day of the week</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 text-left font-semibold">Day</th>
                <th scope="col" className="py-2 text-right font-semibold">Hours</th>
              </tr>
            </thead>
            <tbody>
              {hours.map(([day, time]) => (
                <tr key={day} className="border-b border-border last:border-0">
                  <td className="py-3 text-muted-foreground">{day}</td>
                  <td className="py-3 text-right text-muted-foreground">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-border bg-muted/40 text-center">
          <span className="text-3xl" aria-hidden="true">🗺️</span>
          <p className="text-sm text-muted-foreground">Map placeholder</p>
        </div>
      </section>
    </>
  );
}