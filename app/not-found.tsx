import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Ups — den side kunne vi ikke finde</h1>
        <p style={{ color: "var(--charcoal-soft)", maxWidth: "48ch", margin: "0 auto 28px" }}>
          Siden findes måske ikke længere, eller også har du tastet en forkert adresse.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/">
            Til forsiden
          </Link>
          <Link className="btn btn-outline" href="/ydelser">
            Se ydelser
          </Link>
        </div>
      </div>
    </section>
  );
}
