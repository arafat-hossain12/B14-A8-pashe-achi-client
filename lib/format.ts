const fmt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Dhaka",
});

export function formatDate(iso: string) {
  return fmt.format(new Date(iso));
}

export function isPast(iso: string) {
  return new Date(iso).getTime() < Date.now();
}

// ISO string -> value for <input type="datetime-local"> (browser local time)
export function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function nowLocalInput() {
  return toLocalInput(new Date().toISOString());
}

export function initials(name?: string | null) {
  return (name || "U")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
