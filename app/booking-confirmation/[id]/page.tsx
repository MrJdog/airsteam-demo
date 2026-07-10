import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Booking bekræftet",
  robots: { index: false },
};

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, package_name_snapshot, booking_date, booking_time, status, total_kr, created_at")
    .eq("id", id)
    .single();

  if (!booking) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="section-head" style={{ textAlign: "left" }}>
          <span className="eyebrow">Tak for din booking</span>
          <h1>Booking bekræftet</h1>
          <p>
            Booking <strong>#{booking.id.slice(0, 8).toUpperCase()}</strong> er bekræftet. Vi glæder
            os til at se dig og din bil hos AirSteam.
          </p>
        </div>

        <div className="booking-summary">
          <div className="booking-summary-row">
            <span>Pakke</span>
            <span>{booking.package_name_snapshot}</span>
          </div>
          <div className="booking-summary-row">
            <span>Dato</span>
            <span>{new Date(`${booking.booking_date}T00:00:00`).toLocaleDateString("da-DK")}</span>
          </div>
          <div className="booking-summary-row">
            <span>Tid</span>
            <span>{booking.booking_time.slice(0, 5)}</span>
          </div>
          <div className="booking-summary-row">
            <span>Status</span>
            <span>{booking.status}</span>
          </div>
          <div className="booking-summary-row booking-summary-total">
            <span>Total</span>
            <span>{booking.total_kr.toLocaleString("da-DK")} kr.</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          <Link className="btn btn-primary" href="/profil/bookinger">
            Se mine bookinger
          </Link>
          <Link className="btn btn-outline" href="/">
            Til forsiden
          </Link>
        </div>
      </div>
    </section>
  );
}
