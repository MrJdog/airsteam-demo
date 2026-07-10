import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Ydelser & priser",
  description:
    "Se AirSteams pakker og priser for indvendig bilpleje — Indvendig, Bronze, Sølv og Guld — til små, mellemstore og store biler.",
  alternates: { canonical: "/ydelser" },
};

export const revalidate = 60;

type PackageRow = {
  id: string;
  car_size: "small" | "medium" | "large";
  tier: string;
  name: string;
  description: string;
  price_kr: number;
  sort_order: number;
};

const CAR_SIZES: { key: PackageRow["car_size"]; label: string; examples: string; anchor: string }[] = [
  { key: "small", label: "Små biler", examples: "Fx Renault Clio, Ford Fiesta, Volkswagen Polo, Toyota Yaris, Honda Jazz.", anchor: "smaa-biler" },
  { key: "medium", label: "Mellemstore biler", examples: "Fx Honda Accord, Toyota Camry, Mazda6, Volkswagen Passat, Ford Fusion.", anchor: "mellemstore-biler" },
  { key: "large", label: "Store biler", examples: "Fx BMW 7 Series, Mercedes S-Class, Audi A8, Lexus LS.", anchor: "store-biler" },
];

async function getPackages(): Promise<PackageRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("id, car_size, tier, name, description, price_kr, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Kunne ikke hente pakker:", error.message);
    return [];
  }

  return data ?? [];
}

export default async function YdelserPage() {
  const packages = await getPackages();

  return (
    <>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Ydelser &amp; priser</span>
            <h1>Indvendig bilpleje — vælg din pakke</h1>
            <p>Alle priser er i danske kroner. Vælg den pakke der passer til din bilstørrelse, og book en tid online.</p>
          </div>
          {packages.length > 0 && (
            <nav className="pricing-tabs" aria-label="Genveje til bilstørrelser">
              {CAR_SIZES.map((size) => (
                <a key={size.key} href={`#${size.anchor}`}>
                  {size.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {packages.length === 0 && (
            <div className="empty-state">
              <p>Priserne kunne ikke indlæses lige nu. Prøv igen om lidt.</p>
            </div>
          )}

          {CAR_SIZES.map((size) => {
            const items = packages
              .filter((p) => p.car_size === size.key)
              .sort((a, b) => a.sort_order - b.sort_order);

            if (items.length === 0) return null;

            return (
              <div className="pricing-group" id={size.anchor} key={size.key}>
                <div className="pricing-group-head">
                  <h2>{size.label}</h2>
                  <span className="rule" aria-hidden="true" />
                </div>
                <p style={{ color: "var(--charcoal-soft)", marginTop: -14, marginBottom: 24 }}>
                  {size.examples}
                </p>
                <div className="pricing-cards">
                  {items.map((pkg) => (
                    <div className={`pricing-card${pkg.tier === "solv" ? " is-featured" : ""}`} key={pkg.id}>
                      {pkg.tier === "solv" && <span className="pricing-card-badge">Mest populær</span>}
                      <h3>{pkg.name}</h3>
                      <div className="price">{pkg.price_kr.toLocaleString("da-DK")} kr.</div>
                      <p>{pkg.description}</p>
                      <Link className="btn btn-outline btn-sm" href={`/book?package=${pkg.id}`} style={{ marginTop: 16 }}>
                        Book denne pakke
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="cta-banner">
            <h2>Klar til at booke?</h2>
            <p>Vælg bilstørrelse, pakke og tidspunkt online på under et minut.</p>
            <Link className="btn btn-primary" href="/book">
              Book en tid nu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
