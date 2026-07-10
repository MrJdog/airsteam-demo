"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSlotsForDate } from "@/lib/hours";

export async function getAvailableSlots(dateStr: string): Promise<string[]> {
  const allSlots = getSlotsForDate(dateStr);
  if (allSlots.length === 0) return [];

  const supabase = await createClient();
  const { data: taken } = await supabase
    .from("bookings")
    .select("booking_time")
    .eq("booking_date", dateStr);

  const takenTimes = new Set((taken ?? []).map((b: { booking_time: string }) => b.booking_time.slice(0, 5)));
  return allSlots.filter((slot) => !takenTimes.has(slot));
}

type CreateBookingInput = {
  packageId: string;
  date: string;
  time: string;
};

export async function createBooking(input: CreateBookingInput): Promise<{ error: string } | never> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/book");
  }

  const { data: pkg, error: pkgError } = await supabase
    .from("packages")
    .select("id, name, price_kr")
    .eq("id", input.packageId)
    .single();

  if (pkgError || !pkg) {
    return { error: "Den valgte pakke findes ikke længere." };
  }

  // Re-validate server-side that the slot is still free — avoids a race
  // between two customers booking the same date+time simultaneously.
  const available = await getAvailableSlots(input.date);
  if (!available.includes(input.time)) {
    return { error: "Den valgte tid er desværre ikke længere ledig. Vælg venligst en anden tid." };
  }

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      package_id: pkg.id,
      package_name_snapshot: pkg.name,
      booking_date: input.date,
      booking_time: input.time,
      total_kr: pkg.price_kr,
    })
    .select("id")
    .single();

  if (bookingError || !booking) {
    return { error: "Kunne ikke oprette bookingen. Prøv igen." };
  }

  redirect(`/booking-confirmation/${booking.id}`);
}
