const Hero = () => {
  return (
    <div className="w-full flex flex-col py-[120px] items-center bg-[url(/hero-section@3x.png)] bg-cover bg-no-repeat bg-[top] text-center text-33xl text-gray-white font-body-regular-400">
      <div className="w-full flex flex-col items-center justify-center gap-[62px]">
        <div className="flex flex-col items-center gap-20 max-w-[720px]">
          <div className="relative leading-[72px] font-semibold">
            Žemės gerbūvio darbai
          </div>
          <div className="relative text-xl leading-[28px] font-body-regular-600 text-primary-50">
            Teikiame žemės gerbūvio darbus, sklypų paruošimą, komunikacijų
            tiesimo paslaugas, aplinkos tvarkymą, bei technikos ir įrankių
            nuomą. <br />
            Dirbame greitai, kokybiškai ir patikimai.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
