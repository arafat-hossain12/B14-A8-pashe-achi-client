import { ListSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="skeleton mb-8 h-10 w-64" />
      <ListSkeleton />
    </div>
  );
}
