// app/components/feature-container.js
import Link from "next/link";

export default function FeatureContainer() {
  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="w-[1200px] items-center px-4 max-w-full flex flex-col md:gap-10 gap-20">
        <div className="flex w-full flex-col gap-6 items-center">
          <h2 className="page-heading">Paslaugos</h2>
          <div className="page-subheading">
            Teikiame žemės gerbūvio darbus, sklypų paruošimą, komunikacijų
            tiesimo paslaugas, aplinkos tvarkymą, bei technikos ir įrankių
            nuomą. Atliekame žemės darbus tiek privatiems, tiek verslo klientams
            visoje Žemaitijoje.
          </div>
        </div>

        <div className="w-full max-w-[940px] flex md:flex-col gap-10 md:gap-4">
          <Link href="/paslaugos" className="no-underline flex w-full">
            <div
              className={`w-full rounded-lg bg-gray-white hover:shadow-[0px_24px_68px_rgba(59,_77,_129,_0.08)]
                flex flex-col p-6 text-left text-gray-700 font-body-regular-400
                transition-shadow`}
            >
              <div className="flex flex-col gap-8">
                {/* {icon && <div className="text-primary-500">{icon}</div>} */}
                <div className="flex flex-col gap-6">
                  <h3 className="card-heading">Žemės gerbūvio paslaugos</h3>
                  <p className="text-base leading-[24px] text-lightslategray">
                    Aplinka, sklypo paruošimas, žemės lyginimas ir kiti žemės
                    tvarkymo darbai.
                  </p>
                </div>
                <div className="underline text-primary-500">
                  Visos paslaugos
                </div>
              </div>
            </div>
          </Link>

          <Link href="/nuoma" className="no-underline flex w-full">
            <div
              className={`w-full rounded-lg bg-gray-white hover:shadow-[0px_24px_68px_rgba(59,_77,_129,_0.08)]
                flex flex-col p-6 text-left text-gray-700 font-body-regular-400
                transition-shadow `}
            >
              <div className="flex flex-col gap-8">
                {/* {icon && <div className="text-primary-500">{icon}</div>} */}
                <div className="flex flex-col gap-6">
                  <h3 className="card-heading">Technikos ir įrankių nuoma</h3>
                  <p className="text-base leading-[24px] text-lightslategray">
                    Technika ir įrankiai skirti sklypo, kiemo ir aplinkos
                    tvarkymo darbams.
                  </p>
                </div>
                <div className="underline text-primary-500">
                  Nuomojami įrankiai ir technika
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
