import Link from "next/link";

export default function EmptyState({
  message,
  ctaLabel = "Susisiekite su mumis",
  ctaHref = "/kontaktai",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
      <p className="text-primary-800 text-base max-w-md">{message}</p>
      <Link
        href={ctaHref}
        className="btn-primary inline-flex items-center justify-center h-12 px-6 text-base body-regular-600 text-gray-white animate-fade-in-up opacity-0 [animation-fill-mode:forwards] [animation-delay:150ms]"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
