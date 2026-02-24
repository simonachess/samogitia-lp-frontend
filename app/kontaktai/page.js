// app/kontaktai/page.js
"use client";

import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

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

    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      setErrorMessage("Įveskite teisingą telefono numerį.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    const payload = {
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      email: formData.get("email") || "",
      phone: phoneValue || "",
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
      setPhoneValue("");
      setStatus("sent");
    } catch (e2) {
      console.error(e2);
      setErrorMessage("Nepavyko išsiųsti. Bandykite dar kartą.");
      setStatus("error");
    }
  };

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

          <form
            name="contact"
            onSubmit={onSubmit}
            className="w-full rounded-xl bg-gray-white shadow-[0px_0px_24px_rgba(0,_0,_0,_0.03)] flex flex-col py-7 px-[30px] items-center justify-start gap-[17px] text-left text-base text-primary-800 body-regular-600"
          >
            {/* Honeypot field for bots */}
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="flex flex-col items-center justify-start gap-[6px]">
              <b className="card-heading-sm">Užklausos forma</b>
            </div>

            <div className="flex flex-col items-center justify-start gap-[10px] w-full">
              <div className="flex flex-col md:flex-row items-start justify-center gap-[10px] w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="firstName" className="sr-only">
                    Vardas
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="body-regular-600 text-base bg-[transparent] rounded w-full py-4 px-3 border-[1px] border-solid border-gray focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
                    type="text"
                    placeholder="Vardas"
                    maxLength={100}
                    minLength={2}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="lastName" className="sr-only">
                    Pavardė
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    className="body-regular-600 text-base bg-[transparent] rounded w-full py-4 px-3 border-[1px] border-solid border-gray focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
                    type="text"
                    placeholder="Pavardė"
                    maxLength={100}
                    minLength={2}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start justify-center gap-[10px] w-full">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="contact-phone-number" className="sr-only">
                    Telefonas
                  </label>
                  <div className="contact-phone-input">
                    <PhoneInput
                      international
                      defaultCountry="LT"
                      value={phoneValue}
                      onChange={setPhoneValue}
                      placeholder="612 34567"
                      className="contact-phone-input__control"
                      numberInputProps={{
                        id: "contact-phone-number",
                        className:
                          "body-regular-600 text-base bg-transparent border-0 py-4 px-3 rounded focus:outline-none focus:ring-0 w-full min-w-0",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="email" className="sr-only">
                    El. paštas
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="w-full body-regular-600 text-base bg-[transparent] rounded py-4 px-3 border-[1px] border-solid border-gray focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
                    type="email"
                    placeholder="El. paštas"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="message" className="sr-only">
                  Klausimas
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-[transparent] h-[105px] body-regular-600 text-base rounded box-border p-3 border-[1px] border-solid border-gray focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
                  placeholder="Klausimas"
                  required
                  rows={10}
                  maxLength={5000}
                />
              </div>

              {(status === "sent" || status === "error") && (
                <div
                  role={status === "sent" ? "status" : "alert"}
                  aria-live={status === "sent" ? "polite" : "assertive"}
                  className={`w-full py-3 px-4 rounded text-sm font-medium ${
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
                className="btn-primary w-[222px] h-[46px]"
              >
                <span className="text-base body-regular-600 text-gray-white">
                  {status === "sending" ? "Siunčiama..." : "Siųsti užklausą"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
