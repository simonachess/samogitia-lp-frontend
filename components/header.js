// header.js
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const firstLinkRef = useRef(null);

  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/paslaugos")
      return pathname === "/paslaugos" || pathname.startsWith("/paslaugos/");
    return pathname === href;
  };

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // prevent body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // focus management: focus first link when menu opens, return to burger when closed
  const prevOpenRef = useRef(open);
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    } else if (prevOpenRef.current) {
      burgerRef.current?.focus();
    }
    prevOpenRef.current = open;
  }, [open]);

  const navLinks = [
    { href: "/paslaugos", label: "PASLAUGOS" },
    { href: "/nuoma", label: "NUOMA" },
    { href: "/projektai", label: "ATLIKTI DARBAI" },
    { href: "/apie", label: "APIE MUS" },
    { href: "/kontaktai", label: "KONTAKTAI" },
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-header-logo">
          <Image
            src="/logo.svg"
            alt="Samogitia Group – žemės gerbūvio darbai"
            width={204}
            height={80}
            className="site-header-logo-image"
            priority
          />
        </Link>

        <nav className="site-header-nav" aria-label="Pagrindinė navigacija">
          <ul className="site-header-links">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="site-header-link"
                  data-active={isActive(href) ? "true" : undefined}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/kontaktai"
          className="site-header-contact button button-primary"
        >
          Susisiekti
          <svg
            className="ui-icon h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </Link>

        <button
          ref={burgerRef}
          type="button"
          className="site-header-menu-toggle"
          aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="site-header-menu-icon" aria-hidden="true">
            <span className={open ? "is-open" : ""} />
            <span className={open ? "is-open" : ""} />
            <span className={open ? "is-open" : ""} />
          </span>
        </button>
      </div>

      {open && (
        <div ref={menuRef} className="site-mobile-menu">
          <nav className="site-mobile-menu-nav" aria-label="Meniu">
            <ul className="site-mobile-menu-links">
              <li>
                <Link
                  ref={firstLinkRef}
                  href="/"
                  className="site-mobile-menu-link"
                  onClick={() => setOpen(false)}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  PAGRINDINIS
                </Link>
              </li>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="site-mobile-menu-link"
                    onClick={() => setOpen(false)}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
