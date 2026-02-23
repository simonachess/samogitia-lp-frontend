import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="page-section min-h-[60vh]"
      aria-labelledby="not-found-heading"
    >
      <div className="page-container flex flex-col items-center justify-center gap-6 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
        <h1 id="not-found-heading" className="page-heading text-6xl">
          404
        </h1>
        <p className="page-subheading">
          Puslapis nerastas. Galbūt jis buvo perkeltas arba ištrintas.
        </p>
        <Link href="/" className="btn-primary">
          Grįžti į pradžią
        </Link>
      </div>
    </section>
  );
}
