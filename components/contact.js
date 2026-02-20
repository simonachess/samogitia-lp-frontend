// contact.js

"use client";

import { useState } from "react";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch(window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!res.ok) throw new Error("Failed");
      form.reset();
      setStatus("sent");
    } catch (e2) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full bg-primary-50 py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className=" max-w-[1200px] mx-auto px-4 flex flex-row flex-wrap items-start justify-center text-center text-21xl text-primary-800 font-body-regular-600">
        <div className="flex-1 flex flex-col py-0 px-2.5 box-border items-center justify-start gap-[40px]">
          <div className="w-[720px] flex flex-col items-center justify-start gap-[24px]">
            <h2 className="page-heading">Susisiekite</h2>
            <div className="self-stretch relative page-subheading">
              Užpildykite formą ir mes su jumis susisieksime.
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            className="self-stretch rounded-xl bg-gray-white shadow-[0px_0px_24px_rgba(0,_0,_0,_0.03)] flex flex-col py-7 px-[30px] items-center justify-start gap-[17px] text-left text-5xl text-darkslategray body-regular-600"
          >
            {/* required for Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="self-stretch flex flex-col items-center justify-start gap-[6px]">
              <b className="self-stretch relative leading-[36px]">
                Užklausos forma
              </b>
            </div>

            <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-start justify-center gap-[10px] md:flex-col">
                <input
                  name="firstName"
                  className="body-regular-600 text-base bg-[transparent] self-stretch flex-1 rounded py-4 px-3 border-[1px] border-solid border-gray"
                  type="text"
                  placeholder="Vardas"
                  maxLength={100}
                  minLength={2}
                  required
                />
                <input
                  name="lastName"
                  className="body-regular-600 text-base bg-[transparent] self-stretch flex-1 rounded py-4 px-3 border-[1px] border-solid border-gray"
                  type="text"
                  placeholder="Pavardė"
                  maxLength={100}
                  minLength={2}
                  required
                />
              </div>

              <input
                name="email"
                className="body-regular-600 text-base bg-[transparent] self-stretch rounded py-4 px-3 border-[1px] border-solid border-gray"
                type="email"
                placeholder="El. paštas"
                required
              />

              <textarea
                name="message"
                className="bg-[transparent] h-[105px] body-regular-600 text-base self-stretch rounded box-border p-3 border-[1px] border-solid border-gray"
                placeholder="Klausimas"
                required
                rows={10}
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="cursor-pointer [border:none] p-0 bg-primary-500 rounded w-[222px] h-[46px] flex flex-col items-center justify-center disabled:opacity-60"
              >
                <div className="relative text-base body-regular-600 text-gray-white text-center inline-block w-[203.12px]">
                  {status === "sending" ? "Siunčiama..." : "Siųsti užklausą"}
                </div>
              </button>

              {status === "sent" && (
                <p className="text-sm text-green-700">
                  Ačiū! Užklausa išsiųsta ✅
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Nepavyko išsiųsti. Bandykite dar kartą.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
