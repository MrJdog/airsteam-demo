import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BookingWizard, { type PackageRow } from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Book en tid",
  description: "Book en tid til bilvask hos AirSteam i Grindsted — vælg bilstørrelse, pakke og tidspunkt online.",
  alternates: { canonical: "/book" },
};

async function getPackages(): Promise<PackageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("id, car_size, tier, name, description, price_kr")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Kunne ikke hente pakker:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function BookPage() {
  const packages = await getPackages();

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="section-head" style={{ textAlign: "left", margin: "0 0 32px" }}>
          <span className="eyebrow">Book en tid</span>
          <h1>Book din bilvask</h1>
          <p>Vælg bilstørrelse, pakke og et ledigt tidspunkt. Du bliver bedt om at logge ind, når du bekræfter bookingen.</p>
        </div>

        {packages.length === 0 ? (
          <div className="empty-state">
            <p>Pakkerne kunne ikke indlæses lige nu. Prøv igen om lidt, eller ring til os på 28 73 29 28.</p>
          </div>
        ) : (
          <BookingWizard packages={packages} />
        )}
      </div>
    </section>
  );
}
