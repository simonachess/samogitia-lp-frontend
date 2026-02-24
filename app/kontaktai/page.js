// app/kontaktai/page.js
"use client";

import dynamic from "next/dynamic";

// Lazy-load form with react-phone-number-input so it doesn't block first paint (helps mobile Lighthouse on /kontaktai)
const ContactForm = dynamic(
  () => import("../../components/contact-form").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-xl bg-gray-white shadow-[0px_0px_24px_rgba(0,_0,_0,_0.03)] flex flex-col py-7 px-[30px] items-center justify-center gap-4 min-h-[320px] text-primary-800"
        aria-hidden
      >
        <div className="h-4 w-32 bg-primary-100 rounded animate-pulse" />
        <div className="h-4 w-48 bg-primary-50 rounded animate-pulse" />
      </div>
    ),
  },
);

export default function ContactPage() {
  return (
    <section className="page-section" aria-labelledby="kontaktai-heading">
      <div className="page-container flex flex-row flex-wrap items-start justify-center text-center text-primary-800 font-body-regular-400">
        <div className="max-w-[960px] w-full flex flex-col py-0 px-2.5 box-border items-center justify-start gap-10 md:gap-20">
          <div className="page-heading-block">
            <h1 id="kontaktai-heading" className="page-heading">
              Susisiekite
            </h1>
            <div className="page-subheading">
              Užpildykite formą ir mes su jumis susisieksime.
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
