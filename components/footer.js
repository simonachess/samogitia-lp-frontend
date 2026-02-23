import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full flex py-[40px] items-start justify-start flex-wrap">
      <footer className="page-container flex flex-col gap-[50px] md:flex-row md:justify-between items-start text-left text-base text-gray-black font-body-regular-400">
        <div className="w-max flex flex-col items-start justify-start gap-[20px] text-center text-primary-500 font-body-regular-400">
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <Image
              src="/logo.svg"
              alt="Samogitia Group"
              width={204}
              height={80}
              className="w-auto h-[60px] md:h-20"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-[13px] text-left text-base text-gray-500 font-body-regular-400">
            <div className="w-max gap-2 flex flex-row items-center justify-between">
              <a
                href="https://www.facebook.com/Vytkaa"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-primary-50 flex flex-col p-3.5 items-center justify-center focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
                aria-label="Facebook"
              >
                <img
                  className="w-5 h-[21.67px]"
                  alt=""
                  src="/social-media-logo.svg"
                />
              </a>
              <a
                href="https://www.instagram.com/bertavicius"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-primary-50 flex flex-col p-3.5 items-center justify-center focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
                aria-label="Instagram"
              >
                <img
                  className="relative w-5 h-5 overflow-hidden shrink-0"
                  alt=""
                  src="/social-media-logo3.svg"
                />
              </a>
            </div>
          </div>
        </div>
        <address className="w-max flex flex-col items-start justify-start gap-[32px] not-italic">
          <div className="h-max flex flex-col items-start justify-start gap-[16px] text-base text-gray-500">
            <div className="leading-[24px] font-semibold text-primary-800">
              Kontaktai
            </div>
            <div>MB „Samogitia Group“</div>
            <div>Įm. k.: 306371912</div>
            <div>PVM mok. k.: LT100016553619</div>
            <div>
              Tel.:{" "}
              <a
                href="tel:+37064768414"
                className="leading-[24px] link-default"
                aria-label="Call +370 647 68414"
              >
                +370 647 68414
              </a>
            </div>
            <div>
              El.p.:{" "}
              <a
                href="mailto:samogitiagroup@gmail.com"
                className="leading-[24px] link-default"
                aria-label="Email samogitiagroup@gmail.com"
              >
                samogitiagroup@gmail.com
              </a>
            </div>
          </div>
        </address>
        <nav
          className="w-max flex flex-col items-start justify-start gap-[32px]"
          aria-label="Svetainės nuorodos"
        >
          <ul className="nav-list h-max flex flex-col items-start justify-start gap-[16px] text-base text-gray-500">
            <li>
              <Link href="/paslaugos" className="leading-[24px] link-default">
                Paslaugos
              </Link>
            </li>
            <li>
              <Link href="/nuoma" className="leading-[24px] link-default">
                Nuoma
              </Link>
            </li>
            <li>
              <Link href="/projektai" className="leading-[24px] link-default">
                Atlikti darbai
              </Link>
            </li>
            <li>
              <Link href="/apie" className="leading-[24px] link-default">
                Apie mus
              </Link>
            </li>
            <li>
              <Link href="/privatumas" className="leading-[24px] link-default">
                Privatumo politika
              </Link>
            </li>
            <li>
              <Link href="/taisykles" className="leading-[24px] link-default">
                Naudojimo sąlygos
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
