import SkeletonCard from "../../components/skeleton-card";

export default function ProjectsLoading() {
  return (
    <section className="page-section">
      <div className="page-container page-section-inner">
        <div className="flex flex-col items-center gap-6">
          <div className="h-9 w-48 bg-primary-200/50 rounded animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-primary-200/30 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px] mt-8 w-full">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
