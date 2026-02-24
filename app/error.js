"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App error boundary:", error);
  }, [error]);

  return (
    <section
      className="page-section min-h-[60vh]"
      aria-labelledby="error-heading"
    >
      <div className="page-container flex flex-col items-center justify-center gap-6">
        <h1 id="error-heading" className="page-heading text-4xl">
          Kažkas nutiko
        </h1>
        <p className="page-subheading text-center max-w-[480px]">
          Atsiprašome, įvyko klaida. Galite bandyti dar kartą arba grįžti į
          pradžią.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button type="button" onClick={reset} className="btn-primary">
            Bandyti dar kartą
          </button>
          <Link href="/" className="btn-secondary">
            Grįžti į pradžią
          </Link>
        </div>
      </div>
    </section>
  );
}
