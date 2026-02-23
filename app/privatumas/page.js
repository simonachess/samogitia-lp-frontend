import Link from "next/link";

export const metadata = {
  title: "Privatumo politika",
  description:
    "Samogitia Group privatumo politika – kaip renkame, naudojame ir saugome jūsų duomenis.",
};

export default function PrivacyPage() {
  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[720px] w-full px-4 mx-auto flex flex-col gap-8 text-left">
        <h1 className="page-heading">Privatumo politika</h1>
        <p className="page-subheading text-left">
          Paskutinį kartą atnaujinta: {new Date().toLocaleDateString("lt-LT")}.
          Samogitia Group (toliau – „mes“, „įmonė“) gerbia jūsų privatumą. Šioje
          politikoje aprašome, kokius duomenis renkame, kaip juos naudojame ir
          kaip galite pasinaudoti savo teisėmis.
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="section-heading mb-2">1. Kas esame</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Samogitia Group – įmonė, teikianti žemės gerbūvio paslaugas,
              sklypų paruošimą, technikos ir įrankių nuomą. Svetainės
              administratorius: Samogitia Group. Susisiekti galite per{" "}
              <Link href="/kontaktai" className="link-default">
                kontaktų formą
              </Link>
              , el. paštu{" "}
              <a
                href="mailto:samogitiagroup@gmail.com"
                className="link-default"
              >
                samogitiagroup@gmail.com
              </a>{" "}
              arba telefonu{" "}
              <a href="tel:+37064768414" className="link-default">
                +370 647 68414
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="section-heading mb-2">2. Kokius duomenis renkame</h2>
            <ul className="font-body-regular-400 text-base text-primary-800 leading-relaxed list-disc list-inside space-y-2">
              <li>
                <strong>Kontaktų forma:</strong> vardas, pavardė, el. paštas,
                žinutė – tik tada, kai juos pateikiate norėdami susisiekti.
              </li>
              <li>
                <strong>Slapukai:</strong> būtini svetainės veikimui (pvz.
                sesijos); pasirinktiniai – analitikos (jei sutinkate) siekiant
                pagerinti svetainę.
              </li>
              <li>
                <strong>Techninė informacija:</strong> IP adresas, naršyklės
                tipas, puslapių peržiūros (jei naudojame analitiką ir jūs
                sutinkate).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="section-heading mb-2">3. Kaip naudojame duomenis</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Kontaktų duomenis naudojame tik atsakyti į jūsų užklausas ir
              teikti paslaugas. Slapukus – svetainės veikimui ir (su sutikimu)
              analitikai. Duomenų neperduodame trečiosioms šalims rinkodaros
              tikslais be jūsų sutikimo.
            </p>
          </div>

          <div>
            <h2 className="section-heading mb-2">
              4. Kiek laiko saugome duomenis
            </h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Užklausų ir susirašinėjimo duomenis saugome tik tiek, kiek reikia
              atsakyti ir vykdyti sutartį ar teisėtus interesus. Slapukų
              galiojimo laikus galite peržiūrėti naršyklėje. Galite bet kada
              atšaukti sutikimą – tada nebeįjungsime pasirinktinių slapukų.
            </p>
          </div>

          <div>
            <h2 className="section-heading mb-2">5. Jūsų teisės (BDAR)</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Turite teisę: gauti savo duomenų kopiją, reikalauti pataisyti ar
              ištrinti duomenis, apriboti apdorojimą, nesutikti, atšaukti
              sutikimą. Norėdami pasinaudoti teisėmis, rašykite mums per{" "}
              <Link href="/kontaktai" className="link-default">
                kontaktų formą
              </Link>
              , el. paštu{" "}
              <a
                href="mailto:samogitiagroup@gmail.com"
                className="link-default"
              >
                samogitiagroup@gmail.com
              </a>{" "}
              arba telefonu{" "}
              <a href="tel:+37064768414" className="link-default">
                +370 647 68414
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="section-heading mb-2">6. Slapukų valdymas</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Svetainėje rodomas pranešimas leidžia sutikti arba atsisakyti
              pasirinktinių slapukų. Būtini slapukai reikalingi svetainės
              veikimui ir nepasirenkami. Savo naršyklėje taip pat galite valdyti
              ar ištrinti slapukus.
            </p>
          </div>

          <div>
            <h2 className="section-heading mb-2">7. Pakeitimai ir kontaktai</h2>
            <p className="font-body-regular-400 text-base text-primary-800 leading-relaxed">
              Privatumo politiką galime atnaujinti – apie reikšmingus pakeitimus
              pranešime šioje svetainėje. Klausimams:{" "}
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
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
