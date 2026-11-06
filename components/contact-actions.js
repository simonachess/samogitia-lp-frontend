import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from "../lib/constants";

const secondaryVariants = {
  outline: "button button-outline",
  light: "button button-light",
  primary: "button button-primary",
};

export default function ContactActions({
  className = "",
  secondaryVariant = "outline",
  messageAriaLabel,
}) {
  const secondaryClass =
    secondaryVariants[secondaryVariant] ?? secondaryVariants.outline;

  return (
    <div className={`contact-actions ${className}`.trim()}>
      <a
        href={`tel:${COMPANY_PHONE}`}
        className="button button-primary"
        aria-label={`Skambinti ${COMPANY_PHONE_DISPLAY}`}
      >
        {COMPANY_PHONE_DISPLAY}
        <Phone className="ui-icon" size={16} aria-hidden="true" />
      </a>
      <Link
        href="/kontaktai"
        className={secondaryClass}
        aria-label={messageAriaLabel}
      >
        Rašyti žinutę
        <Mail className="ui-icon" size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
