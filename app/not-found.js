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
        <p className="page-subheading text-center max-w-[480px]">
          Puslapis nerastas. Galbūt jis buvo perkeltas arba ištrintas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/" className="btn-primary">
            Grįžti į pradžią
          </Link>
          <nav
            className="flex flex-wrap gap-4 justify-center"
            aria-label="Populiarūs puslapiai"
          >
            <Link href="/paslaugos" className="link-default">
              Paslaugos
            </Link>
            <Link href="/nuoma" className="link-default">
              Nuoma
            </Link>
            <Link href="/projektai" className="link-default">
              Atlikti darbai
            </Link>
            <Link href="/kontaktai" className="link-default">
              Kontaktai
            </Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
