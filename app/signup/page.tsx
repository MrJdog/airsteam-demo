import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Opret konto",
  robots: { index: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="section">
      <div className="container auth-shell">
        <div className="section-head">
          <span className="eyebrow">Opret konto</span>
          <h1>Bliv kunde hos AirSteam</h1>
        </div>
        <SignupForm redirectTo={params.redirect || "/profil"} />
        <p className="form-note">
          Har du allerede en konto?{" "}
          <Link href={`/login${params.redirect ? `?redirect=${encodeURIComponent(params.redirect)}` : ""}`}>
            Log ind
          </Link>
        </p>
      </div>
    </section>
  );
}
