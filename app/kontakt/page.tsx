import type { Metadata } from "next";
import Link from "next/link";
import HoursTable from "@/components/HoursTable";
import OpeningStatusBadge from "@/components/OpeningStatusBadge";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt & åbningstider",
  description:
    "Find adresse, telefonnummer og åbningstider for AirSteam bilvask i Grindsted. Book din tid online eller skriv til os.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Kontakt</span>
            <h1>Find os &amp; book en tid</h1>
            <p>Book online, ring, eller skriv til os — vi svarer hurtigst muligt.</p>
          </div>

          <div className="contact-grid">
            <div>
              <ContactForm />
            </div>

            <div>
              <div className="info-card">
                <h2>Kontaktoplysninger</h2>
                <div className="info-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>Jernbanegade 17, 7200 Grindsted</span>
                </div>
                <div className="info-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M4 5c0-1 1-2 2-2h2l2 5-2 1.5a11 11 0 0 0 5.5 5.5L15 13l5 2v2c0 1-1 2-2 2C10.5 19 4 12.5 4 5Z" />
                  </svg>
                  <a href="tel:+4528732928">28 73 29 28</a>
                </div>
                <div className="info-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  <a href="mailto:Airsteam.dk@hotmail.com">Airsteam.dk@hotmail.com</a>
                </div>
              </div>

              <div className="info-card">
                <h2>Åbningstider</h2>
                <HoursTable />
                <div style={{ marginTop: 18 }}>
                  <OpeningStatusBadge light />
                </div>
              </div>

              <div className="map-frame">
                <iframe
                  src="https://maps.google.com/maps?q=Jernbanegade+17,+7200+Grindsted&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kort over AirSteams placering på Jernbanegade 17, 7200 Grindsted"
                />
                <a
                  className="btn btn-primary map-cta"
                  href="https://www.google.com/maps/search/?api=1&query=Jernbanegade+17+7200+Grindsted"
                  target="_blank"
                  rel="noopener"
                >
                  Åbn rutevejledning
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="cta-banner">
            <h2>Klar til at booke?</h2>
            <p>Vælg bilstørrelse, pakke og tidspunkt online.</p>
            <Link className="btn btn-primary" href="/book">
              Book en tid nu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
