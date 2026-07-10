"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus } from "@/lib/hours";

export default function OpeningStatusBadge({ light = false }: { light?: boolean }) {
  const [status, setStatus] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  const classes = ["status-badge"];
  if (light) classes.push("status-badge-light");
  if (status && !status.open) classes.push("is-closed");

  return (
    <div className={classes.join(" ")}>
      <span className="status-dot" aria-hidden="true" />
      <span>{status ? status.text : "Henter åbningstider…"}</span>
    </div>
  );
}
