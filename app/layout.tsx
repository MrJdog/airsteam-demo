import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.airsteam.dk"),
  title: {
    default: "AirSteam | Professionel bilvask & bilpleje i Grindsted",
    template: "%s | AirSteam",
  },
  description:
    "AirSteam tilbyder professionel indvendig og udvendig bilvask i Grindsted. Skånsom behandling, synligt resultat. Book din tid online.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: "AirSteam",
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Spring til indhold
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
