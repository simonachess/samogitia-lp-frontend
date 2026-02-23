// components/feature-container.js
import Link from "next/link";
import { Construction, Wrench, Images } from "lucide-react";

const iconSize = 24;
const iconBoxSize = "w-12 h-12";

const cardBase =
  "rounded-xl bg-gray-white hover:shadow-[0px_24px_68px_rgba(59,_77,_129,_0.08)] hover:-translate-y-1 flex flex-col text-left text-gray-700 font-body-regular-400 transition-all duration-300 ease-out border border-primary-50";
const cardIconBox =
  "flex-shrink-0 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500";
const cardTitle = "card-heading text-primary-800";
const cardDesc = "text-base leading-[24px] text-lightslategray";
const cardCta =
  "inline-flex items-center gap-1 text-primary-500 font-medium text-base mt-auto";

const ChevronRight = () => (
  <svg
    className="w-4 h-4 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function FeatureContainer() {
  return (
    <section className="page-section" aria-labelledby="features-heading">
      <div className="page-container page-section-inner">
        <div className="page-heading-block w-full animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          <h2 id="features-heading" className="page-heading">
            Paslaugos
          </h2>
          <div className="page-subheading">
            Teikiame žemės gerbūvio darbus, sklypų paruošimą, komunikacijų
            tiesimo paslaugas, aplinkos tvarkymą, bei technikos ir įrankių
            nuomą. Atliekame žemės darbus tiek privatiems, tiek verslo klientams
            visoje Žemaitijoje.
          </div>
        </div>

        {/* Simple grid: 3 cols desktop, 1 col mobile */}
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          <Link
            href="/paslaugos"
            className="no-underline flex w-full focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded-xl animate-fade-in-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]"
          >
            <article className={`w-full flex flex-col p-6 gap-5 ${cardBase}`}>
              <div className="flex items-center gap-4">
                <div className={`${iconBoxSize} ${cardIconBox}`}>
                  <Construction size={iconSize} strokeWidth={1.5} />
                </div>
                <h3 className={`${cardTitle} flex-1`}>
                  Žemės gerbūvio paslaugos
                </h3>
              </div>
              <p className={cardDesc}>
                Aplinka, sklypo paruošimas, žemės lyginimas ir kiti žemės
                tvarkymo darbai.
              </p>
              <span className={cardCta}>
                Visos paslaugos
                <ChevronRight />
              </span>
            </article>
          </Link>

          <Link
            href="/nuoma"
            className="no-underline flex w-full focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded-xl animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]"
          >
            <article className={`w-full flex flex-col p-6 gap-5 ${cardBase}`}>
              <div className="flex items-center gap-4">
                <div className={`${iconBoxSize} ${cardIconBox}`}>
                  <Wrench size={iconSize} strokeWidth={1.5} />
                </div>
                <h3 className={`${cardTitle} flex-1`}>
                  Technikos ir įrankių nuoma
                </h3>
              </div>
              <p className={cardDesc}>
                Technika ir įrankiai sklypo, kiemo ir aplinkos darbams.
              </p>
              <span className={cardCta}>
                Nuomoti
                <ChevronRight />
              </span>
            </article>
          </Link>

          <Link
            href="/projektai"
            className="no-underline flex w-full focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded-xl animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]"
          >
            <article className={`w-full flex flex-col p-6 gap-5 ${cardBase}`}>
              <div className="flex items-center gap-4">
                <div className={`${iconBoxSize} ${cardIconBox}`}>
                  <Images size={iconSize} strokeWidth={1.5} />
                </div>
                <h3 className={`${cardTitle} flex-1`}>Atlikti darbai</h3>
              </div>
              <p className={cardDesc}>
                Mūsų įgyvendinti projektai ir atlikti darbai.
              </p>
              <span className={cardCta}>
                Peržiūrėti
                <ChevronRight />
              </span>
            </article>
          </Link>
        </div>
      </div>
    </section>
  );
}
