export default function Loading() {
  return (
    <div className="w-full bg-primary-50 flex flex-col items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary-400/40 border-t-primary-500 animate-spin-slow" />
        <p className="text-sm text-lightslategray">Kraunama...</p>
      </div>
    </div>
  );
}
