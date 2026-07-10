// Single source of truth for opening hours — used by the status badge,
// the hours table, and to generate bookable time slots.
// 0 = Sunday ... 6 = Saturday, matches Date#getDay().
export const HOURS = [
  { day: 0, label: "Søndag", opens: null, closes: null },
  { day: 1, label: "Mandag", opens: "09:00", closes: "17:00" },
  { day: 2, label: "Tirsdag", opens: "09:00", closes: "17:00" },
  { day: 3, label: "Onsdag", opens: "09:00", closes: "17:00" },
  { day: 4, label: "Torsdag", opens: "09:00", closes: "17:00" },
  { day: 5, label: "Fredag", opens: "09:00", closes: "17:00" },
  { day: 6, label: "Lørdag", opens: "10:00", closes: "14:00" },
] as const;

export const SLOT_MINUTES = 60;

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function copenhagenNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Copenhagen",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const map: Record<string, string> = {};
  parts.forEach((p) => {
    map[p.type] = p.value;
  });

  const day = WEEKDAY_INDEX[map.weekday];
  let hour = parseInt(map.hour, 10);
  const minute = parseInt(map.minute, 10);
  if (hour === 24) hour = 0;

  return { day, minutes: hour * 60 + minute };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function getOpeningStatus(): { open: boolean; text: string } {
  const now = copenhagenNow();
  const today = HOURS[now.day];

  if (today.opens && now.minutes >= toMinutes(today.opens) && now.minutes < toMinutes(today.closes)) {
    return { open: true, text: `Åbent nu · Lukker ${today.closes}` };
  }

  for (let i = 0; i < 8; i++) {
    const idx = (now.day + i) % 7;
    const entry = HOURS[idx];
    if (!entry.opens) continue;
    if (i === 0 && now.minutes >= toMinutes(entry.closes)) continue;

    const when = i === 0 ? `kl. ${entry.opens}` : `${entry.label} kl. ${entry.opens}`;
    return { open: false, text: `Lukket nu · Åbner ${when}` };
  }

  return { open: false, text: "Lukket nu" };
}

/** All possible slot start times ("HH:MM") for the given date's weekday, ignoring existing bookings. */
export function getSlotsForDate(dateStr: string): string[] {
  const dayOfWeek = new Date(`${dateStr}T00:00:00`).getDay();
  const entry = HOURS[dayOfWeek];
  if (!entry.opens) return [];

  const open = toMinutes(entry.opens);
  const close = toMinutes(entry.closes);
  const slots: string[] = [];

  for (let start = open; start + SLOT_MINUTES <= close; start += SLOT_MINUTES) {
    slots.push(toHHMM(start));
  }

  return slots;
}
