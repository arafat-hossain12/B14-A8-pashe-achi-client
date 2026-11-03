import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import UpcomingSection from "@/components/home/UpcomingSection";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import { GridSkeleton } from "@/components/Skeletons";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Suspense
        fallback={
          <section className="bg-base-200/60 py-16">
            <div className="mx-auto max-w-7xl px-4"><GridSkeleton /></div>
          </section>
        }
      >
        <UpcomingSection />
      </Suspense>
      <Gallery />
      <Newsletter />
    </>
  );
}
