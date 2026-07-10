import { HOURS, copenhagenNow } from "@/lib/hours";

export default function HoursTable() {
  const today = copenhagenNow().day;

  return (
    <table className="hours-table">
      <tbody>
        {HOURS.map((row) => (
          <tr key={row.day} data-today={row.day === today ? "true" : "false"}>
            <td>{row.label}</td>
            <td>{row.opens ? `${row.opens}–${row.closes}` : "Lukket"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
