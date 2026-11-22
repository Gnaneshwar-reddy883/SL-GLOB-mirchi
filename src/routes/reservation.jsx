import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { submitReservation } from "@/lib/server-fns";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Book a Table | Mirchi" },
      {
        name: "description",
        content:
          "Reserve a table at Mirchi in Kolkata. Tell us the date, time and how many are coming.",
      },
    ],
  }),
  component: ReservationPage,
});

const emptyForm = { name: "", phone: "", email: "", date: "", time: "", guests: "", request: "" };

// The browser check. The server runs the same rules again before saving.
function validate(values) {
  const errors = {};

  if (values.name.trim().length < 3) {
    errors.name = "Please enter your full name (at least 3 characters).";
  }
  if (!/^[0-9]{10}$/.test(values.phone.trim())) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const today = new Date().toISOString().slice(0, 10);
  if (!values.date) {
    errors.date = "Please choose a date.";
  } else if (values.date < today) {
    errors.date = "The date cannot be in the past.";
  }

  if (!values.time) errors.time = "Please choose a time.";

  const guests = Number(values.guests);
  if (!values.guests || guests < 1 || guests > 20) {
    errors.guests = "Guests must be between 1 and 20.";
  }

  return errors;
}

function Field({ id, label, type = "text", value, onChange, error, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition-colors ${
          error ? "border-destructive" : "border-border focus:border-primary"
        }`}
        {...rest}
      />
      <p className="mt-1 min-h-4 text-xs text-destructive">{error || ""}</p>
    </div>
  );
}

function ReservationPage() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Set after mount so the server and the browser render the same thing.
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFailed(false);

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSending(true);
    try {
      const result = await submitReservation({
        data: { ...form, guests: Number(form.guests) },
      });

      if (result.ok) {
        setSent(true);
        setForm(emptyForm);
      } else {
        setErrors(result.errors || {});
      }
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book a Table"
        text="Tell us when you are coming and we will keep a table warm."
      />

      <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        {sent ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 font-heading text-2xl font-semibold">Your table is requested</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Thank you. We have your booking and will call the number you gave us to confirm.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-7 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book another table
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 md:p-9">
            {failed && (
              <p className="mb-5 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                Sorry, we could not save your booking. Please try again.
              </p>
            )}

            <div className="grid gap-x-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Full name"
                value={form.name}
                onChange={update}
                error={errors.name}
                placeholder="Ananya Sen"
                autoComplete="name"
              />
              <Field
                id="phone"
                label="Phone number"
                type="tel"
                value={form.phone}
                onChange={update}
                error={errors.phone}
                placeholder="9830012345"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
              />
              <Field
                id="email"
                label="Email address"
                type="email"
                value={form.email}
                onChange={update}
                error={errors.email}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <Field
                id="date"
                label="Date"
                type="date"
                value={form.date}
                onChange={update}
                error={errors.date}
                min={minDate || undefined}
              />
              <Field
                id="time"
                label="Time"
                type="time"
                value={form.time}
                onChange={update}
                error={errors.time}
              />
              <Field
                id="guests"
                label="Number of guests"
                type="number"
                value={form.guests}
                onChange={update}
                error={errors.guests}
                min={1}
                max={20}
                placeholder="4"
                inputMode="numeric"
              />
            </div>

            <div className="mt-1">
              <label htmlFor="request" className="mb-1.5 block text-xs font-medium">
                Special request (optional)
              </label>
              <textarea
                id="request"
                name="request"
                rows={3}
                value={form.request}
                onChange={update}
                placeholder="Window seat, birthday cake, allergies..."
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {sending ? "Saving..." : "Confirm Reservation"}
            </button>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Every field is checked in the browser and again on the server before the booking is
              saved.
            </p>
          </form>
        )}
      </section>
    </>
  );
}