export default function ProjectDetailLoading() {
  return (
    <section className="page-section">
      <div className="page-container page-section-inner animate-pulse">
        <nav className="w-full max-w-[960px] mb-4">
          <div className="h-4 w-48 bg-primary-200/50 rounded" />
        </nav>
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="h-10 w-3/4 max-w-[600px] bg-primary-200/50 rounded" />
          <div className="h-5 w-full max-w-[960px] bg-primary-200/30 rounded" />
          <div className="h-5 w-full max-w-[960px] bg-primary-200/30 rounded" />
          <div className="h-5 w-2/3 max-w-[600px] bg-primary-200/30 rounded" />
          <div className="aspect-video w-full max-w-[900px] bg-primary-100/50 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
