export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type EventItem = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  joinCount: number;
};

export type JoinItem = {
  _id: string;
  eventId: string;
  joinedAt: string;
  event: Pick<EventItem, "title" | "thumbnail" | "location" | "eventType" | "eventDate">;
};

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Food Distribution",
  "Education",
  "Health Camp",
  "Other",
];

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;
  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.message || "Request failed", res.status, data.errors);
  return data as T;
}

// Public endpoints (no token needed)
export async function publicFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, { cache: "no-store" });
  return parse<T>(res);
}

// Protected endpoints: get a JWT from our own Next.js route, then call Express.
export async function authFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const t = await fetch("/api/token", { cache: "no-store" });
  if (!t.ok) throw new ApiError("Please log in to continue", 401);
  const { token } = await t.json();
  const res = await fetch(`${API_URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  return parse<T>(res);
}
