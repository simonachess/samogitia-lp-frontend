import SkeletonCard from "../../components/skeleton-card";

export default function ServicesLoading() {
  return (
    <section className="page-section">
      <div className="page-container page-section-inner">
        <div className="flex w-full flex-col gap-6 items-center">
          <div className="h-9 w-48 bg-primary-200/50 rounded animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-primary-200/30 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] w-full max-w-[960px] gap-4 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
