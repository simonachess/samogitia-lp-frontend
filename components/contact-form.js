"use client";

import { useState } from "react";
import { PHONE_COUNTRY_CODE, PHONE_DIGITS_LENGTH } from "../lib/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") || "").trim();

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Įveskite teisingą el. pašto adresą.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    const phoneDigits = (formData.get("phone") || "")
      .replace(/\D/g, "")
      .slice(0, PHONE_DIGITS_LENGTH);
    const payload = {
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      email: formData.get("email") || "",
      phone: phoneDigits ? `${PHONE_COUNTRY_CODE}${phoneDigits}` : "",
      message: formData.get("message") || "",
      botField: formData.get("bot-field") || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage("Per daug užklausų. Bandykite vėliau.");
        } else if (res.status === 400 && data?.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage("Nepavyko išsiųsti. Bandykite dar kartą.");
        }
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch (e2) {
      console.error(e2);
      setErrorMessage("Nepavyko išsiųsti. Bandykite dar kartą.");
      setStatus("error");
    }
  };

  return (
    <form name="contact" onSubmit={onSubmit} className="contact-form">
      <p className="contact-form-honeypot">
        <label>
          Don't fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="contact-form-fields">
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="firstName">Vardas</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              maxLength={100}
              minLength={2}
              required
            />
          </div>
          <div className="contact-form-field">
            <label htmlFor="lastName">Pavardė</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              maxLength={100}
              minLength={2}
              required
            />
          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-form-field">
            <label htmlFor="contact-phone-number">Tel. numeris</label>
            <div className="contact-form-phone">
              <span aria-hidden="true">{PHONE_COUNTRY_CODE}</span>
              <input
                id="contact-phone-number"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                inputMode="numeric"
                pattern={`[0-9]{${PHONE_DIGITS_LENGTH}}`}
                maxLength={PHONE_DIGITS_LENGTH}
                title="8 skaitmenys"
              />
            </div>
          </div>
          <div className="contact-form-field">
            <label htmlFor="email">El. paštas</label>
            <input id="email" name="email" type="email" required />
          </div>
        </div>

        <div className="contact-form-field">
          <label htmlFor="message">Klausimas</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={5000}
          />
        </div>

        {(status === "sent" || status === "error") && (
          <div
            role={status === "sent" ? "status" : "alert"}
            aria-live={status === "sent" ? "polite" : "assertive"}
            className={`contact-form-status ${
              status === "sent"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status === "sent"
              ? "Ačiū! Užklausa išsiųsta. Susisieksime su jumis netrukus."
              : errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="button button-primary button-compact contact-form-submit"
        >
          {status === "sending" ? "Siunčiama..." : "Siųsti užklausą"}
        </button>
      </div>
    </form>
  );
}
