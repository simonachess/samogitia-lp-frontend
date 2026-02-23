import Link from "next/link";

export const metadata = {
  title: "Ačiū",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="page-section" aria-labelledby="dekojame-heading">
      <div className="page-container flex flex-col items-center justify-center gap-8 py-16 text-center text-primary-800">
        <h1 id="dekojame-heading" className="page-heading">
          Ačiū!
        </h1>
        <p className="page-subheading max-w-md">
          Užklausa išsiųsta. Susisieksime su jumis netrukus.
        </p>
        <Link
          href="/"
          className="btn-primary inline-flex items-center justify-center h-12 px-6 text-base body-regular-600 text-gray-white"
        >
          Grįžti į pradžią
        </Link>
      </div>
    </section>
  );
}
