export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-base-300 bg-base-200/60">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="section-title">{title}</h1>
        {subtitle && <p className="section-sub mt-3">{subtitle}</p>}
      </div>
    </div>
  );
}
