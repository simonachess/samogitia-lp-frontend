import { useMemo } from "react";

const Footer = () => {
  return (
    <div
      id="contacts"
      className="self-stretch overflow-hidden flex flex-row px-[80px] py-[40px] items-start justify-start md:w-auto md:flex-row sm:flex-col"
    >
      <footer className="flex-1 flex flex-row items-start justify-between text-left text-5xl text-gray-black font-body-regular-400 md:flex-col md:gap-[50px] sm:flex-col sm:gap-[50px]">
        <div className="w-max flex flex-col items-start justify-start gap-[20px] text-center text-primary-500 font-body-regular-600">
          <div className="flex flex-row items-center justify-center gap-[8px]">
            <img className="w-auto h-20" alt="" src="/logo.svg" />
          </div>
          <div className="flex flex-col items-start justify-start gap-[13px] text-left text-base text-gray-500 font-body-regular-400">
            {/* <div className="leading-[24px]">Call : +123 400 123</div>
            <div className="leading-[24px] text-gray-700">
              Email: example@mail.com
            </div> */}
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
          <div className="self-stretch h-max flex flex-col items-start justify-start gap-[16px] text-base text-gray-500">
            <div className="leading-[24px]">Kontaktai</div>

            <div className="leading-[24px]">Call : +123 400 123</div>
            <div className="leading-[24px] text-gray-700">
              Email: example@mail.com
            </div>
          </div>
        </div>
        <div className="w-max flex flex-col items-start justify-start gap-[32px]">
          <div className="h-max flex flex-col items-start justify-start gap-[16px] text-base text-gray-500">
            <div className="leading-[24px]">Paslaugos</div>
            <div className="leading-[24px]">Atlikti darbai</div>
            <div className="leading-[24px]">Apie mus</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
