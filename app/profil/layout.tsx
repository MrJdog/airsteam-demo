import type { Metadata } from "next";
import ProfileTabs from "@/components/ProfileTabs";

export const metadata: Metadata = {
  title: "Min profil",
  robots: { index: false },
};

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="section-head" style={{ textAlign: "left", margin: "0 0 24px" }}>
          <span className="eyebrow">Min profil</span>
          <h1>Din side hos AirSteam</h1>
        </div>
        <ProfileTabs />
        {children}
      </div>
    </section>
  );
}
