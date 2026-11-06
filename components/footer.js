import Link from "next/link";
import Image from "next/image";
import {
  COMPANY_PHONE,
  COMPANY_PHONE_DISPLAY,
  COMPANY_EMAIL,
} from "../lib/constants";

const Footer = () => {
  return (
    <div className="site-footer-shell">
      <footer className="site-footer">
        <div className="site-footer-main">
          <div className="site-footer-company">
            <Link href="/" className="site-footer-logo">
              <Image
                src="/logo.svg"
                alt="Samogitia Group"
                width={204}
                height={80}
              />
            </Link>
            <address className="site-footer-contact">
              <p>MB „Samogitia Group“</p>
              <p>Įm. k.: 306371912</p>
              <p>PVM mok. k.: LT100016553619</p>
              <a
                href={`tel:${COMPANY_PHONE}`}
                aria-label={`Skambinti ${COMPANY_PHONE_DISPLAY}`}
              >
                {COMPANY_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                aria-label={`El. paštas ${COMPANY_EMAIL}`}
              >
                {COMPANY_EMAIL}
              </a>
            </address>
          </div>

          <nav
            className="site-footer-navigation"
            aria-label="Svetainės nuorodos"
          >
            <ul>
              <li>
                <Link href="/paslaugos">Paslaugos</Link>
              </li>
              <li>
                <Link href="/nuoma">Nuoma</Link>
              </li>
              <li>
                <Link href="/projektai">Atlikti darbai</Link>
              </li>
              <li>
                <Link href="/apie">Apie mus</Link>
              </li>
              <li>
                <Link href="/kontaktai">Kontaktai</Link>
              </li>
            </ul>
          </nav>

          <div className="site-footer-social">
            <a
              href="https://www.facebook.com/Vytkaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social-media-logo.svg"
                alt=""
                width={18}
                height={20}
              />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bertavicius"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/social-media-logo3.svg"
                alt=""
                width={18}
                height={18}
              />
              Instagram
            </a>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-legal">
            <Link href="/privatumas">Privatumo politika</Link>
            <Link href="/taisykles">Naudojimo sąlygos</Link>
          </div>
          <p>
            © {new Date().getFullYear()} Samogitia Group. Visos teisės saugomos.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
