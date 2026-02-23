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
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center" aria-hidden>
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="currentColor"
                  fillRule="evenodd"
                  viewBox="0 175 650 650"
                  aria-hidden
                >
                  <g transform="translate(269.81467,-650.62904)">
                    <path d="m -126.267,1038.85 c 22.737,50.44 15.792,102.75 -15.51,116.87 -31.303,14.12 -75.11,-15.31 -97.845,-65.74 -22.737,-50.43 -15.793,-102.745 15.51,-116.863 31.303,-14.114 75.108,15.317 97.845,65.733 z" />
                    <path d="m 183.155,1038.85 c -22.738,50.44 -15.793,102.75 15.512,116.87 31.303,14.12 75.106,-15.31 97.846,-65.74 22.734,-50.43 15.789,-102.745 -15.513,-116.863 -31.301,-14.114 -75.108,15.317 -97.845,65.733 z" />
                    <path d="m 6.7856,937.757 c 11.6548,54.069 -6.1108,103.763 -39.6787,111.003 -33.5654,7.23 -70.2249,-30.74 -81.8779,-84.804 -11.653,-54.068 6.112,-103.764 39.6792,-110.997 33.5669,-7.236 70.2246,30.729 81.8774,84.798 z" />
                    <path d="m 49.2676,937.803 c -11.6446,54.068 6.1084,103.767 39.6738,110.997 33.5676,7.24 70.2256,-30.73 81.8776,-84.797 11.654,-54.069 -6.109,-103.765 -39.678,-110.998 -33.5678,-7.234 -70.225,30.729 -81.8734,84.798 z" />
                    <path d="m -35.2275,1118.5 c -8.1924,14.15 -46.1563,60.99 -72.4145,76.97 -26.256,15.98 -58.792,39.38 -53.332,93.11 5.457,53.74 60.575,76.74 96.8597,74.7 36.2867,-2.03 104.6993,-8.71 153.543,-1.94 48.8413,6.77 110.4863,1.64 124.9223,-49.81 14.436,-51.45 -17.85,-84.23 -43.044,-102.83 -25.193,-18.59 -67.265,-74.2 -80.2269,-99.73 -12.96,-25.52 -78.9268,-72.26 -126.3076,9.53 z" />
                  </g>
                </svg>
              </span>
              <span>MB „Samogitia Group“</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </span>
              <span>Įm. k.: 306371912</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
              <span>PVM mok. k.: LT100016553619</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z"
                  />
                </svg>
              </span>
              <a
                href="tel:+37064768414"
                className="leading-[24px] link-default"
                aria-label="Skambinti +370 647 68414"
              >
                +370 647 68414
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <a
                href="mailto:samogitiagroup@gmail.com"
                className="leading-[24px] link-default"
                aria-label="El. paštas samogitiagroup@gmail.com"
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
