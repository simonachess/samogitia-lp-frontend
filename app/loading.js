export default function Loading() {
  return (
    <div className="w-full bg-primary-50 flex flex-col items-center justify-center py-20">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-400/30" />
        <p className="text-sm text-lightslategray">Kraunama...</p>
      </div>
    </div>
  );
}
