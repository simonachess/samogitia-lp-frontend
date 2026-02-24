// app/kontaktai/page.js
"use client";

import ContactForm from "../../components/contact-form";

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
