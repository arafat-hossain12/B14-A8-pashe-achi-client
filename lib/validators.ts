export function validatePassword(password: string): string | null {
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
  return null;
}

export function validateEmail(email: string): string | null {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Enter a valid email address";
}

export function validateUrl(url: string): string | null {
  return /^https?:\/\/.+/i.test(url) ? null : "Enter a valid image URL (http/https)";
}

export type EventFormValues = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string; // datetime-local value
};

export function validateEventForm(v: EventFormValues) {
  const e: Partial<Record<keyof EventFormValues, string>> = {};
  if (v.title.trim().length < 5) e.title = "Title must be at least 5 characters";
  if (v.description.trim().length < 20) e.description = "Description must be at least 20 characters";
  if (!v.eventType) e.eventType = "Choose an event type";
  const u = validateUrl(v.thumbnail.trim());
  if (u) e.thumbnail = u;
  if (v.location.trim().length < 3) e.location = "Location is required";
  if (!v.eventDate) e.eventDate = "Event date is required";
  else if (new Date(v.eventDate).getTime() <= Date.now()) e.eventDate = "Event date must be in the future";
  return e;
}
