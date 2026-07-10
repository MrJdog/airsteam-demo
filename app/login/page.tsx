import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log ind",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="section">
      <div className="container auth-shell">
        <div className="section-head">
          <span className="eyebrow">Login</span>
          <h1>Log ind</h1>
        </div>
        <LoginForm redirectTo={params.redirect || "/profil"} />
        <p className="form-note">
          Ny hos os?{" "}
          <Link href={`/signup${params.redirect ? `?redirect=${encodeURIComponent(params.redirect)}` : ""}`}>
            Opret en konto
          </Link>
        </p>
      </div>
    </section>
  );
}
