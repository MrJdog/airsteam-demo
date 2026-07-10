"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccountLink from "@/components/AccountLink";

const LINKS = [
  { href: "/", label: "Forside" },
  { href: "/ydelser", label: "Ydelser & priser" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile nav on navigation — adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") instead of
  // an effect, so it doesn't trigger an extra render pass.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setNavOpen(false);
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link className="logo" href="/">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="#0d6b5e" />
            <path d="M7 19c1-4 4-7 9-7s8 3 9 7" fill="none" stroke="#f2faf6" strokeWidth="2" strokeLinecap="round" />
            <rect x="8" y="18" width="16" height="6" rx="3" fill="#f2faf6" />
            <circle cx="12" cy="24" r="1.6" fill="#0d6b5e" />
            <circle cx="20" cy="24" r="1.6" fill="#0d6b5e" />
            <path d="M22 9c1.2 1.4 1.2 2.8 0 4.2" fill="none" stroke="#2f9bd6" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>
            AirSteam
            <span className="logo-sub">Shine &amp; Clean</span>
          </span>
        </Link>

        <nav className={`main-nav${navOpen ? " is-open" : ""}`} aria-label="Hovedmenu">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn-primary header-cta" href="/book">
            Book en tid
          </Link>
        </nav>

        <div className="header-actions">
          <AccountLink />
          <button
            className="nav-toggle"
            aria-label="Åbn menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
