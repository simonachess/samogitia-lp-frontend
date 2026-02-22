export const metadata = {
  title: "Apie mus",
  description:
    "Samogitia Group – žemės gerbūvio darbai, sklypų paruošimas, technikos ir įrankių nuoma Žemaitijoje ir visoje Lietuvoje.",
};

export default function AboutPage() {
  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] items-center w-full px-4 mx-auto body-regular-600 gap-8 flex flex-col">
        <h1 className="page-heading">Apie mus</h1>
        <div className="page-subheading max-w-[720px]">
          Teikiame profesionalius žemės gerbūvio darbus, sklypų paruošimą,
          technikos ir įrankių nuomą visoje Žemaitijoje ir Lietuvoje.
        </div>

        <div className="flex flex-col gap-6 text-left max-w-[720px] w-full">
          <div>
            <h2 className="section-heading mb-2">Kas mes esame</h2>
            <p className="font-body-regular-400 text-base text-lightslategray leading-[28px]">
              Samogitia Group– įmonė, specializuojanti žemės gerbūvio darbuose.
              Atliekame sklypų paruošimą, reljefo formavimą, komunikacijų
              tiesimą ir aplinkos tvarkymą. Taip pat siūlome technikos ir
              įrankių nuomą privatiems ir verslo klientams.
            </p>
          </div>

          <div>
            <h2 className="section-heading mb-2">Mūsų paslaugos</h2>
            <ul className="font-body-regular-400 list-disc list-inside text-base text-lightslategray leading-[28px] space-y-2">
              <li>Žemės gerbūvio darbai ir sklypo paruošimas</li>
              <li>Reljefo formavimas ir žemės lyginimas</li>
              <li>Komunikacijų tiesimas ir kasimas</li>
              <li>Aplinkos tvarkymas</li>
              <li>Technikos ir įrankių nuoma</li>
            </ul>
          </div>

          <div>
            <h2 className="section-heading mb-2">Aptarnaujame</h2>
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
