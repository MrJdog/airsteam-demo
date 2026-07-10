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
          <picture>
            <source srcSet="/images/logo.webp" type="image/webp" />
            <img src="/images/logo.jpg" alt="AirSteam – Shine & Clean" width={750} height={362} />
          </picture>
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
