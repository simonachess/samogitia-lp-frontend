import Link from "next/link";

export default function NotFound() {
  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600 min-h-[60vh]">
      <div className="max-w-[1200px] w-full px-4 mx-auto flex flex-col items-center justify-center gap-6 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
        <h1 className="page-heading text-6xl">404</h1>
        <p className="page-subheading">
          Puslapis nerastas. Galbūt jis buvo perkeltas arba ištrintas.
        </p>
        <Link
          href="/"
          className="cursor-pointer [border:none] py-3 px-6 bg-primary-500 rounded text-gray-white font-medium hover:opacity-90 focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 transition-all duration-200 active:scale-[0.98]"
        >
          Grįžti į pradžią
        </Link>
      </div>
    </section>
  );
}
