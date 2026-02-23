import Link from "next/link";

export const metadata = {
  title: "Naudojimo sąlygos",
  description:
    "Samogitia Group svetainės naudojimo sąlygos – teisės, atsakomybė ir kontaktai.",
};

export default function TermsPage() {
  const updatedAt = new Date();
  return (
    <section className="page-section" aria-labelledby="taisykles-heading">
      <div className="page-container-narrow flex flex-col gap-8 text-left animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
        <h1 id="taisykles-heading" className="page-heading">
          Naudojimo sąlygos
        </h1>
        <p className="page-subheading text-left">
          Naudodamiesi MB „Samogitia Group“ svetaine sutinkate su šiomis
          sąlygomis. Paskutinį kartą atnaujinta:{" "}
          <time dateTime={updatedAt.toISOString().split("T")[0]}>
            {updatedAt.toLocaleDateString("lt-LT")}
          </time>
          .
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="section-heading">1. Bendros nuostatos</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Šios sąlygos reglamentuoja svetainės naudojimą. Svetainės
              administratorius – MB „Samogitia Group“. Naudodamiesi svetaine
              patvirtinate, kad sutinkate su šiomis sąlygomis ir su mūsų{" "}
              <Link href="/privatumas" className="link-default">
                privatumo politika
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="section-heading">2. Paslaugų aprašymas</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Svetainėje pateikiame informaciją apie žemės gerbūvio paslaugas,
              sklypų paruošimą, technikos ir įrankių nuomą. Turinys skiriamas
              informaciniais tikslais. Konkretūs pasiūlymai ir sutartys
              sudaromos atskirai per{" "}
              <Link href="/kontaktai" className="link-default">
                kontaktus
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="section-heading">3. Intelektinė nuosavybė</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Svetainės turinys (tekstai, nuotraukos, logotipai, dizainas) yra
              MB „Samogitia Group“ nuosavybė arba naudojamas su teisėtųjų
              leidimu. Be rašytinio sutikimo draudžiama kopijuoti, platinti ar
              naudoti komerciniais tikslais.
            </p>
          </div>

          <div>
            <h2 className="section-heading">4. Atsakomybės apribojimas</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Svetainėje pateikiama informacija gali būti keičiama be
              išankstinio įspėjimo. Stengiamės teikti teisingą informaciją,
              tačiau neatsakome už netiesioginius nuostolius, kylančius iš
              svetainės naudojimo ar jos turinio. Nuorodos į trečiųjų šalių
              svetaines – ne mūsų atsakomybė.
            </p>
          </div>

          <div>
            <h2 className="section-heading">5. Pakeitimai</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Galime atnaujinti naudojimo sąlygas. Apie reikšmingus pakeitimus
              pranešime šioje svetainėje. Toliau naudodamiesi svetaine po
              pakeitimų sutinkate su atnaujintomis sąlygomis.
            </p>
          </div>

          <div>
            <h2 className="section-heading">6. Kontaktai</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Klausimams dėl sąlygų:{" "}
              <a
                href="mailto:samogitiagroup@gmail.com"
                className="link-default"
              >
                samogitiagroup@gmail.com
              </a>
              ,{" "}
              <a href="tel:+37064768414" className="link-default">
                +370 647 68414
              </a>
              .{" "}
              <Link href="/kontaktai" className="link-default">
                Kontaktų forma
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
