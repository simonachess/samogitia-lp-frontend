import Image from "next/image";
import { Phone } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from "../lib/constants";

/** Hero image src – single source for layout preload and hero Image. Optional mobile src for smaller LCP. */
export const HERO_IMAGE_SRC = "/hero-v7.jpg";
export const HERO_IMAGE_SRC_MOBILE = "/hero-mobile.jpg";

const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQACEQADAPwA/9k=";

export default function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="home-hero-copy">
        <h1 id="hero-heading" className="home-hero-heading">
          Žemės gerbūvio darbai Žemaitijoje
        </h1>
        <p className="home-hero-subheading">
          Dirbame greitai, kokybiškai ir patikimai, užtikrindami aukštą darbų
          atlikimo standartą kiekviename projekte.
        </p>
        <a
          href={`tel:${COMPANY_PHONE}`}
          className="button button-primary home-phone-link"
          aria-label={`Skambinti ${COMPANY_PHONE_DISPLAY}`}
        >
          <span>{COMPANY_PHONE_DISPLAY}</span>
          <Phone className="ui-icon" size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="home-hero-image">
        <div className="absolute inset-0 sm:hidden">
          <Image
            src={HERO_IMAGE_SRC_MOBILE}
            alt="Ekskavatorius ir sunkvežimis atliekant žemės darbus"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 768px, 100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src={HERO_IMAGE_SRC}
            alt="Ekskavatorius ir sunkvežimis atliekant žemės darbus"
            fill
            priority
            unoptimized
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
