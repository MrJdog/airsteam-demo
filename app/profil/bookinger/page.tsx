import { createClient } from "@/lib/supabase/server";

export default async function BookingerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, package_name_snapshot, booking_date, booking_time, status, total_kr")
    .eq("user_id", user!.id)
    .order("booking_date", { ascending: false })
    .order("booking_time", { ascending: false });

  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-state">
        <p>Du har ikke bookinger endnu.</p>
      </div>
    );
  }

  return (
    <div>
      {bookings.map((booking) => (
        <div className="booking-card" key={booking.id}>
          <div>
            <h3>{booking.package_name_snapshot}</h3>
            <div style={{ color: "var(--charcoal-soft)", fontSize: "0.92rem" }}>
              {new Date(`${booking.booking_date}T00:00:00`).toLocaleDateString("da-DK")} kl. {booking.booking_time.slice(0, 5)}
            </div>
            <div style={{ color: "var(--teal)", fontWeight: 700, marginTop: 6 }}>
              {booking.total_kr.toLocaleString("da-DK")} kr.
            </div>
          </div>
          <span className="booking-status">{booking.status}</span>
        </div>
      ))}
    </div>
  );
}
