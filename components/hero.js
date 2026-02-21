const Hero = () => {
  return (
    <div className="w-full flex flex-col py-[120px] md:py-[80px] items-center bg-[url(/hero-section.jpg)] bg-cover bg-no-repeat bg-[top] text-center text-33xl text-gray-white font-body-regular-400">
      <div className="w-full flex flex-col items-center justify-center gap-[62px]">
        <div className="flex flex-col items-center md:gap-10 gap-20 max-w-[720px]">
          <h1 className="relative font-semibold text-[52px] md:text-[42px]">
            Žemės gerbūvio darbai Žemaitijoje
          </h1>
          <div className="flex flex-col gap-4">
            <div className="relative text-xl px-4 leading-[28px] font-body-regular-400 text-primary-50">
              Teikiame žemės gerbūvio darbus, sklypų paruošimą, komunikacijų
              tiesimo paslaugas, aplinkos tvarkymą, bei technikos ir įrankių
              nuomą.
            </div>
            <div className="relative text-xl px-4 leading-[28px] font-body-regular-400 text-primary-50">
              Dirbame greitai, kokybiškai ir patikimai, užtikrindami aukštą
              darbų atlikimo standartą kiekviename projekte.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
