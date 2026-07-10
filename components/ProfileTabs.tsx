"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/profil", label: "Konto" },
  { href: "/profil/bookinger", label: "Bookinger" },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className="profile-tabs" aria-label="Profilmenu">
      {TABS.map((tab) => (
        <Link key={tab.href} href={tab.href} aria-current={pathname === tab.href ? "page" : undefined}>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
