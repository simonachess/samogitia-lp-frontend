import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex py-[40px] items-start justify-start flex-wrap">
      <footer className=" max-w-[1200px] w-full px-4 mx-auto flex flex-row items-start justify-between text-left text-5xl text-gray-black font-body-regular-400 md:flex-col md:gap-[50px] sm:flex-col sm:gap-[50px]">
        <div className="w-max flex flex-col items-start justify-start gap-[20px] text-center text-primary-500 font-body-regular-400">
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <img
              className="w-auto md:h-[60px] h-20"
              alt=""
              src="/logo.svg"
              width={204}
              height={80}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-[13px] text-left text-base text-gray-500 font-body-regular-400">
            <div className="w-max gap-2 flex flex-row items-center justify-between">
              <div className="rounded bg-primary-50 flex flex-col p-3.5 items-center justify-center">
                <img
                  className="w-5 h-[21.67px]"
                  alt=""
                  src="/social-media-logo.svg"
                />
              </div>
              <div className="rounded bg-primary-50 flex flex-col p-3.5 items-center justify-center">
                <img
                  className="relative w-5 h-5 overflow-hidden shrink-0"
                  alt=""
                  src="/social-media-logo3.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-max flex flex-col items-start justify-start gap-[32px]">
          <div className="h-max flex flex-col items-start justify-start gap-[16px] text-base text-gray-500">
            <div className="leading-[24px]">Kontaktai</div>

            <a
              href="tel:+37064768414"
              className="leading-[24px] text-inherit"
              aria-label="Call +370 647 68414"
            >
              +370 647 68414
            </a>
            <a
              href="mailto:samogitiagroup@gmail.com"
              className="leading-[24px] text-inherit"
              aria-label="Email samogitiagroup@gmail.com"
            >
              samogitiagroup@gmail.com
            </a>
          </div>
        </div>
        <div className="w-max flex flex-col items-start justify-start gap-[32px]">
          <div className="h-max flex flex-col items-start justify-start gap-[16px] text-base text-gray-500">
            <Link href="/paslaugos" className="leading-[24px] text-inherit">
              Paslaugos
            </Link>
            <Link href="/nuoma" className="leading-[24px] text-inherit">
              Nuoma
            </Link>
            <Link href="/projektai" className="leading-[24px] text-inherit">
              Atlikti darbai
            </Link>
            <Link href="/apie" className="leading-[24px] text-inherit">
              Apie mus
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
