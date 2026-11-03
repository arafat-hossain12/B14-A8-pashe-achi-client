const photos = [
  { src: "/gallery/g1.jpg", cap: "Winter clothes distribution" },
  { src: "/gallery/g2.jpg", cap: "Riverside tree plantation" },
  { src: "/gallery/g3.jpg", cap: "Blood donation camp" },
  { src: "/gallery/g4.jpg", cap: "Neighbourhood clean-up" },
  { src: "/gallery/g5.jpg", cap: "Food for the hungry" },
  { src: "/gallery/g6.jpg", cap: "Free school supplies drive" },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="section-title">Moments from our community</h2>
        <p className="section-sub mx-auto mt-3">Real people, real neighbourhoods, real change.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((p) => (
          <figure key={p.src} className="group relative aspect-[4/3] overflow-hidden rounded-box bg-primary/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.cap} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-sm font-medium text-white">
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
