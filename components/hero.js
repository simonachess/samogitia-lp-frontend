import Image from "next/image";

const PHONE_NUMBER = "+37064768414";
const PHONE_DISPLAY = "+370 647 68414";

// Tiny blur placeholder (gray/earth tone) – shows while hero loads, then fades to sharp
const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQADAPwA/9k=";

const Hero = () => {
  return (
    <section
      className="relative w-full flex flex-col items-center py-[80px] md:py-[120px] text-center text-gray-white font-body-regular-400 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background: blur placeholder first, then sharp image when loaded */}
      <div className="absolute inset-0 z-0">
        {/* Mobile: optimized + blur placeholder */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/hero-v7.jpg"
            alt="Žemės gerbūvio darbai Žemaitijoje"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover object-top transition-opacity duration-300"
          />
        </div>
        {/* Desktop: unoptimized + blur placeholder */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/hero-v7.jpg"
            alt="Žemės gerbūvio darbai Žemaitijoje"
            fill
            priority
            unoptimized
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover object-top transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Content on top of the image */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-[62px]">
        <div className="flex flex-col items-center gap-10 md:gap-20 max-w-[720px]">
          <h1
            id="hero-heading"
            className="hero-heading relative text-primary-50 px-4 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
          >
            Žemės gerbūvio darbai Žemaitijoje
          </h1>
          <div className="hero-subheading relative px-4 text-primary-50 animate-fade-in-up opacity-0 [animation-delay:150ms] [animation-fill-mode:forwards]">
            Dirbame greitai, kokybiškai ir patikimai, užtikrindami aukštą darbų
            atlikimo standartą kiekviename projekte.
          </div>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="btn-primary inline-flex items-center justify-center gap-2 text-gray-white animate-fade-in-up opacity-0 [animation-delay:250ms] [animation-fill-mode:forwards]"
            aria-label={`Skambinti ${PHONE_DISPLAY}`}
          >
            <svg
              className="w-5 h-5 shrink-0 text-gray-white"
              aria-hidden
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z"
              />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
