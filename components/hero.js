import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center py-[80px] md:py-[120px] text-center text-gray-white font-body-regular-400 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-desktop.jpg"
          alt="Žemės gerbūvio darbai Žemaitijoje"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover object-top"
        />
      </div>

      {/* Content on top of the image */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-[62px]">
        <div className="flex flex-col items-center gap-10 md:gap-20 max-w-[720px]">
          <h1 className="hero-heading relative text-primary-50 px-4 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            Žemės gerbūvio darbai Žemaitijoje
          </h1>
          <div className="hero-subheading relative px-4 text-primary-50 animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
            Dirbame greitai, kokybiškai ir patikimai, užtikrindami aukštą darbų
            atlikimo standartą kiekviename projekte.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
