import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: "AirSteam",
  url: "https://www.airsteam.dk/",
  telephone: "+4528732928",
  email: "Airsteam.dk@hotmail.com",
  priceRange: "kr. 700–2800",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jernbanegade 17",
    addressLocality: "Grindsted",
    postalCode: "7200",
    addressCountry: "DK",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero">
        <div className="hero-art" aria-hidden="true">
          <picture>
            <source srcSet="/images/hero-carwash.webp" type="image/webp" />
            <img
              src="/images/hero-carwash.jpg"
              alt=""
              width={1200}
              height={800}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="container hero-inner">
          <span className="hero-eyebrow">Professionel bilpleje | Grindsted</span>
          <h1>Professionel bilpleje og detailing</h1>
          <p className="lede">
            AirSteam giver din bil en skånsom og grundig behandling — indvendig rens, udvendig
            vask og lakpleje, tilpasset din biltype.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-ghost hero-cta" href="/book">
              Book din tid
            </Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4v14" />
            <path d="m6 13 6 6 6-6" />
          </svg>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head-left">
            <h2>Vores services</h2>
            <p>Fra en hurtig udvendig vask til komplet detailing — vi har løsningen til din bil.</p>
            <span className="rule-short" aria-hidden="true" />
          </div>
          <div className="grid grid-3">
            <Link className="feature-card" href="/ydelser">
              <picture>
                <source srcSet="/images/card-indvendig.webp" type="image/webp" />
                <img
                  className="feature-card-image"
                  src="/images/card-indvendig.jpg"
                  alt="Indvendig rengøring af bil hos AirSteam"
                  width={700}
                  height={500}
                  loading="lazy"
                />
              </picture>
              <div className="feature-card-body">
                <h3>Indvendig rengøring</h3>
                <p>Måtter bankes, støvsuges og steames. Grundig aftørring af alle overflader.</p>
                <p className="price-tag">
                  fra <strong>700</strong> kr
                </p>
              </div>
            </Link>
            <Link className="feature-card" href="/ydelser">
              <picture>
                <source srcSet="/images/card-udvendig.webp" type="image/webp" />
                <img
                  className="feature-card-image"
                  src="/images/card-udvendig.jpg"
                  alt="Udvendig håndvask af bil hos AirSteam"
                  width={700}
                  height={500}
                  loading="lazy"
                />
              </picture>
              <div className="feature-card-body">
                <h3>Indvendig + udvendig</h3>
                <p>Skånsom håndvask kombineret med indvendig rengøring.</p>
                <p className="price-tag">
                  fra <strong>900</strong> kr
                </p>
              </div>
            </Link>
            <Link className="feature-card" href="/ydelser">
              <picture>
                <source srcSet="/images/card-polering.webp" type="image/webp" />
                <img
                  className="feature-card-image"
                  src="/images/card-polering.jpg"
                  alt="Polering og lakpleje af bil hos AirSteam"
                  width={700}
                  height={500}
                  loading="lazy"
                />
              </picture>
              <div className="feature-card-body">
                <h3>Polering &amp; lakpleje</h3>
                <p>Voksbehandling der beskytter lakken og giver bilen en skinnende finish.</p>
                <p className="price-tag">
                  fra <strong>1.500</strong> kr
                </p>
              </div>
            </Link>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-primary" href="/ydelser" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.85rem" }}>
              Se alle services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Hvorfor AirSteam</span>
            <h2>Grundigt håndværk, hver gang</h2>
          </div>
          <div className="grid grid-4">
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 21s-7-4.35-9.5-8.8C.9 8.7 2.4 5 6 5c2 0 3.5 1.2 4 2.6C10.5 6.2 12 5 14 5c3.6 0 5.1 3.7 3.5 7.2C19 16.65 12 21 12 21Z" />
              </svg>
              <h3>Behandlet med omhu</h3>
              <p>Din bil får samme grundige behandling hver gang — uanset størrelse eller pakke.</p>
            </div>
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 21c8 0 14-6 14-14V5h-2C9 5 5 11 5 19Z" />
                <path d="M5 21c0-4 2-8 6-11" />
              </svg>
              <h3>Skånsomme metoder</h3>
              <p>Vi bruger produkter og teknikker der beskytter lak og interiør frem for at slide på det.</p>
            </div>
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <h3>Book nemt online</h3>
              <p>Vælg bilstørrelse, pakke og tidspunkt online, døgnet rundt.</p>
            </div>
            <div className="feature">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
              </svg>
              <h3>Fair &amp; gennemsigtige priser</h3>
              <p>Se alle priser på forhånd — ingen overraskelser når du henter bilen.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Kundeudtalelser</span>
            <h2>Hvad vores kunder siger</h2>
          </div>
          <div className="grid grid-3">
            <div className="testimonial">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <p>&ldquo;Bilen var som ny efter Guld-pakken. Utroligt grundigt arbejde, og de tog sig virkelig god tid.&rdquo;</p>
              <p className="testimonial-name">Mette L.</p>
            </div>
            <div className="testimonial">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <p>&ldquo;Nem online booking og super venlig betjening. Kommer helt sikkert igen.&rdquo;</p>
              <p className="testimonial-name">Kasper N.</p>
            </div>
            <div className="testimonial">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <p>&ldquo;Indvendig rengøring fjernede pletter jeg troede var umulige at få væk. Kan varmt anbefales.&rdquo;</p>
              <p className="testimonial-name">Sofie R.</p>
            </div>
            <div className="testimonial">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <p>&ldquo;Professionel polering — lakken skinner virkelig flot nu. Værd for pengene.&rdquo;</p>
              <p className="testimonial-name">Thomas B.</p>
            </div>
            <div className="testimonial">
              <div className="stars" aria-hidden="true">★★★★☆</div>
              <p>&ldquo;God service og fair priser. Blev færdig lidt hurtigere end forventet.&rdquo;</p>
              <p className="testimonial-name">Ida K.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="cta-banner">
            <h2>Klar til en skinnende ren bil?</h2>
            <p>Book en tid online — vælg bilstørrelse, pakke og tidspunkt på under et minut.</p>
            <Link className="btn btn-primary" href="/book">
              Book en tid nu
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Ofte stillede spørgsmål</span>
            <h2>Alt du skal vide om bilpleje</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Hvor lang tid tager en behandling?</summary>
              <p>Det afhænger af pakken og bilens størrelse — en Indvendig-pakke tager typisk 45-60 minutter, mens en Guld-pakke kan tage op til 2 timer.</p>
            </details>
            <details className="faq-item">
              <summary>Skal jeg booke tid på forhånd?</summary>
              <p>Ja, vi anbefaler at booke online på forhånd, så vi kan sætte den rette tid af til din bil. Du booker nemt via &quot;Book en tid&quot; øverst på siden.</p>
            </details>
            <details className="faq-item">
              <summary>Hvilke produkter bruger I?</summary>
              <p>Vi bruger skånsomme, bilvenlige produkter der beskytter både lak og interiør, uden at gå på kompromis med resultatet.</p>
            </details>
            <details className="faq-item">
              <summary>Tilbyder I mobil bilpleje, hvor I kommer ud til mig?</summary>
              <p>Nej, i øjeblikket arbejder vi udelukkende fra vores værksted på Jernbanegade 17 i Grindsted.</p>
            </details>
            <details className="faq-item">
              <summary>Hvad er forskellen på polering og voksbehandling?</summary>
              <p>Polering fjerner små ridser og gør lakken blank, mens voksbehandling lægger et beskyttende lag ovenpå der værner mod vejr og snavs. Vores Sølv- og Guld-pakker inkluderer voksbehandling.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Besøg os</span>
            <h2>Find os i Grindsted</h2>
          </div>
          <div className="visit-grid">
            <div className="info-card" style={{ marginBottom: 0 }}>
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
              <Link className="btn btn-outline" href="/kontakt" style={{ marginTop: 8 }}>
                Kontakt os
              </Link>
            </div>
            <div className="info-card" style={{ marginBottom: 0 }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Åbningstider</h2>
              <table className="hours-table">
                <tbody>
                  <tr><td>Man–Fre</td><td>09:00–17:00</td></tr>
                  <tr><td>Lørdag</td><td>10:00–14:00</td></tr>
                  <tr><td>Søndag</td><td>Lukket</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
