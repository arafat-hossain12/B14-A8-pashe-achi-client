import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-content">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6 5c2 0 3.3 1 4 2.2h0C10.7 6 12 5 14 5c3.3 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21z" />
        </svg>
      </span>
      <span className="font-[family-name:var(--font-heading)]">
        Pashe <span className="text-primary">Achi</span>
      </span>
    </Link>
  );
}
