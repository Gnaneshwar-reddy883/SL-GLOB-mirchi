import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const reservationShape = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  date: z.string(),
  time: z.string(),
  guests: z.number(),
  request: z.string(),
});

// The same rules the browser checks, applied again on the server because a
// browser can always be bypassed. The PHP version of this page does the same.
export const submitReservation = createServerFn({ method: "POST" })
  .validator(reservationShape)
  .handler(async ({ data, context }) => {
    const name = data.name.trim();
    const phone = data.phone.trim();
    const email = data.email.trim();
    const request = data.request.trim();
    const errors = {};

    if (name.length < 3) {
      errors.name = "Please enter your full name (at least 3 characters).";
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    const today = new Date().toISOString().slice(0, 10);
    if (!data.date) {
      errors.date = "Please choose a date.";
    } else if (data.date < today) {
      errors.date = "The date cannot be in the past.";
    }

    if (!data.time) {
      errors.time = "Please choose a time.";
    }
    if (!Number.isFinite(data.guests) || data.guests < 1 || data.guests > 20) {
      errors.guests = "Guests must be between 1 and 20.";
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    await context.getBase44().entities.Reservation.create({
      name,
      phone,
      email,
      date: data.date,
      time: data.time,
      guests: data.guests,
      request,
      submitted_at: new Date().toISOString(),
    });

    return { ok: true };
  });