export default function RentalDetailLoading() {
  return (
    <section className="page-section">
      <div className="page-container page-section-inner animate-pulse">
        <nav className="w-full max-w-[960px] mb-4">
          <div className="h-4 w-48 bg-primary-200/50 rounded" />
        </nav>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-200/50 rounded" />
            <div className="h-10 w-48 bg-primary-200/50 rounded" />
          </div>
          <div className="h-5 w-full max-w-[800px] bg-primary-200/30 rounded" />
          <div className="h-5 w-2/3 max-w-[500px] bg-primary-200/30 rounded" />
        </div>
      </div>
    </section>
  );
}
