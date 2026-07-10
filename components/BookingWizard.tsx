"use client";

import { useMemo, useState, useTransition } from "react";
import { getAvailableSlots, createBooking } from "@/lib/actions/bookings";

export type PackageRow = {
  id: string;
  car_size: "small" | "medium" | "large";
  tier: string;
  name: string;
  description: string;
  price_kr: number;
};

const CAR_SIZES: { key: PackageRow["car_size"]; label: string; examples: string }[] = [
  { key: "small", label: "Små biler", examples: "Fx Clio, Fiesta, Polo, Yaris" },
  { key: "medium", label: "Mellemstore biler", examples: "Fx Accord, Camry, Passat" },
  { key: "large", label: "Store biler", examples: "Fx 7 Series, S-Class, A8" },
];

const TIER_ORDER = ["indvendig", "bronze", "solv", "guld"];

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

export default function BookingWizard({
  packages,
  initialPackageId,
}: {
  packages: PackageRow[];
  initialPackageId?: string;
}) {
  const preselected = packages.find((p) => p.id === initialPackageId) ?? null;
  const [carSize, setCarSize] = useState<PackageRow["car_size"] | null>(preselected?.car_size ?? null);
  const [packageId, setPackageId] = useState<string | null>(preselected?.id ?? null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const packagesForSize = useMemo(
    () =>
      packages
        .filter((p) => p.car_size === carSize)
        .sort((a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier)),
    [packages, carSize]
  );

  const selectedPackage = packages.find((p) => p.id === packageId) ?? null;

  function chooseCarSize(size: PackageRow["car_size"]) {
    setCarSize(size);
    setPackageId(null);
    setDate("");
    setTime(null);
    setSlots(null);
  }

  function choosePackage(id: string) {
    setPackageId(id);
    setDate("");
    setTime(null);
    setSlots(null);
  }

  async function handleDateChange(value: string) {
    setDate(value);
    setTime(null);
    setSlots(null);
    setError(null);
    if (!value) return;

    setLoadingSlots(true);
    try {
      const available = await getAvailableSlots(value);
      setSlots(available);
    } finally {
      setLoadingSlots(false);
    }
  }

  function handleConfirm() {
    if (!packageId || !date || !time) return;
    setError(null);
    startTransition(async () => {
      const result = await createBooking({ packageId, date, time });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div>
      <div className="wizard-steps">
        <span className={!carSize ? "is-active" : ""}>1. Bilstørrelse</span>
        <span className={carSize && !packageId ? "is-active" : ""}>2. Pakke</span>
        <span className={packageId && !time ? "is-active" : ""}>3. Dato &amp; tid</span>
        <span className={!!time ? "is-active" : ""}>4. Bekræft</span>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.2rem" }}>1. Vælg bilstørrelse</h2>
        <div className="option-grid">
          {CAR_SIZES.map((size) => (
            <button
              key={size.key}
              type="button"
              className={`option-card${carSize === size.key ? " is-selected" : ""}`}
              onClick={() => chooseCarSize(size.key)}
            >
              <h3>{size.label}</h3>
              <p>{size.examples}</p>
            </button>
          ))}
        </div>
      </div>

      {carSize && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.2rem" }}>2. Vælg pakke</h2>
          <div className="option-grid option-grid-4">
            {packagesForSize.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                className={`option-card${packageId === pkg.id ? " is-selected" : ""}`}
                onClick={() => choosePackage(pkg.id)}
              >
                <h3>{pkg.name}</h3>
                <div className="price">{pkg.price_kr.toLocaleString("da-DK")} kr.</div>
                <p>{pkg.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPackage && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.2rem" }}>3. Vælg dato &amp; tid</h2>
          <div className="form-field date-field">
            <label htmlFor="booking-date">Dato</label>
            <input
              id="booking-date"
              type="date"
              min={todayISO()}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>

          {date && loadingSlots && <p style={{ color: "var(--charcoal-soft)" }}>Henter ledige tider…</p>}

          {date && !loadingSlots && slots && slots.length === 0 && (
            <p style={{ color: "var(--charcoal-soft)" }}>
              Ingen ledige tider denne dag (lukket eller fuldt booket). Prøv en anden dato.
            </p>
          )}

          {date && !loadingSlots && slots && slots.length > 0 && (
            <div className="slot-grid">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`slot-btn${time === slot ? " is-selected" : ""}`}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedPackage && date && time && (
        <div>
          <h2 style={{ fontSize: "1.2rem" }}>4. Bekræft booking</h2>
          {error && <div className="form-error">{error}</div>}
          <div className="booking-summary">
            <div className="booking-summary-row">
              <span>Pakke</span>
              <span>{selectedPackage.name}</span>
            </div>
            <div className="booking-summary-row">
              <span>Dato</span>
              <span>{new Date(`${date}T00:00:00`).toLocaleDateString("da-DK")}</span>
            </div>
            <div className="booking-summary-row">
              <span>Tid</span>
              <span>{time}</span>
            </div>
            <div className="booking-summary-row booking-summary-total">
              <span>Total</span>
              <span>{selectedPackage.price_kr.toLocaleString("da-DK")} kr.</span>
            </div>
            <button
              className="btn btn-primary btn-block"
              type="button"
              disabled={pending}
              onClick={handleConfirm}
              style={{ marginTop: 20 }}
            >
              {pending ? "Bekræfter…" : "Bekræft booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
