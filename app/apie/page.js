export const metadata = {
  title: "Apie mus",
  description:
    "Samogitia Group – žemės gerbūvio darbai, sklypų paruošimas, technikos ir įrankių nuoma Žemaitijoje ir visoje Lietuvoje.",
};

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="page-container page-section-inner flex flex-col items-center gap-8 body-regular-600 max-w-[960px]">
        <h1 className="page-heading">Apie mus</h1>
        <div className="page-subheading">
          Teikiame profesionalius žemės gerbūvio darbus, sklypų paruošimą,
          technikos ir įrankių nuomą visoje Žemaitijoje ir Lietuvoje.
        </div>

        <div className="flex flex-col gap-6 text-left w-full">
          <div>
            <h2 className="section-heading">Kas mes esame</h2>
            <p className="font-body-regular-400 text-base text-lightslategray leading-[28px]">
              Samogitia Group – įmonė, specializuojanti žemės gerbūvio darbuose.
              Atliekame sklypų paruošimą, reljefo formavimą, komunikacijų
              tiesimą ir aplinkos tvarkymą. Taip pat siūlome technikos ir
              įrankių nuomą privatiems ir verslo klientams.
            </p>
          </div>

          <div>
            <h2 className="section-heading">Mūsų paslaugos</h2>
            <ul className="font-body-regular-400 list-disc list-inside text-base text-lightslategray leading-[28px] space-y-2">
              <li>Žemės gerbūvio darbai ir sklypo paruošimas</li>
              <li>Reljefo formavimas ir žemės lyginimas</li>
              <li>Komunikacijų tiesimas ir kasimas</li>
              <li>Aplinkos tvarkymas</li>
              <li>Technikos ir įrankių nuoma</li>
            </ul>
          </div>

          <div>
            <h2 className="section-heading">Aptarnaujame</h2>
            <p className="font-body-regular-400 text-base text-lightslategray leading-[28px]">
              Dirbame Telšiuose, Plungėje, Mažeikiuose, Šiauliuose, Klaipėdoje
              ir visame Žemaitijos regione. Susisiekite su mumis – paruošime
              individualų pasiūlymą jūsų projektui.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
