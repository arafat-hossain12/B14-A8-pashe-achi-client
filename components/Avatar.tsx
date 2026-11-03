import { initials } from "@/lib/format";

export default function Avatar({
  src,
  name,
  size = 40,
}: {
  src?: string | null;
  name?: string | null;
  size?: number;
}) {
  const style = { width: size, height: size };
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name || "User"}
        referrerPolicy="no-referrer"
        style={style}
        className="rounded-full object-cover ring-2 ring-primary/40"
      />
    );
  }
  return (
    <span
      style={style}
      className="grid place-items-center rounded-full bg-primary text-sm font-bold text-primary-content"
    >
      {initials(name)}
    </span>
  );
}
