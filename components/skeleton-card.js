/**
 * Skeleton placeholder for cards (services, projects, rentals).
 * Used during loading states.
 */
export default function SkeletonCard() {
  return (
    <div className="w-full rounded-lg bg-primary-50 animate-pulse" aria-hidden>
      <div className="aspect-[4/3] bg-primary-100/50 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-primary-200/50 rounded w-3/4" />
        <div className="h-4 bg-primary-200/30 rounded w-full" />
        <div className="h-4 bg-primary-200/30 rounded w-2/3" />
      </div>
    </div>
  );
}
