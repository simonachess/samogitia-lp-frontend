// app/kontaktai/page.js
"use client";

import ContactForm from "../../components/contact-form";

export default function ContactPage() {
  return (
    <section className="contact-page" aria-labelledby="kontaktai-heading">
      <div className="contact-page-content">
        <div className="contact-page-heading">
          <h1 id="kontaktai-heading">Susisiekite</h1>
          <p>Užpildykite formą ir mes su jumis susisieksime.</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
