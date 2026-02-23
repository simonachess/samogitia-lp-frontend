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

  const linkClass = (href) =>
    `relative leading-[22px] py-1 px-3 text-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded ${
      isActive(href) ? "text-primary-500 underline" : "no-underline"
    }`;

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
    <header className="bg-gray-white h-[76px] md:h-[98px] flex flex-row py-2 md:py-4 box-border items-center justify-between sticky w-full top-0 [background:white] z-[50] text-center text-base text-primary-500 font-body-regular-400">
      <div className="page-container flex flex-row items-center justify-between w-full">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-[8px] focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded"
        >
          <Image
            src="/logo.svg"
            alt="Samogitia Group – žemės gerbūvio darbai"
            width={204}
            height={80}
            className="w-auto h-[60px] md:h-20"
            priority
          />
        </Link>

        <nav
          className="flex flex-row items-center justify-end gap-[36px] text-sm text-primary-900"
          aria-label="Pagrindinė navigacija"
        >
          <ul className="nav-list hidden lg:flex flex-row items-start justify-start gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={linkClass(href)}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile burger – animated */}
          <button
            ref={burgerRef}
            type="button"
            className="cursor-pointer [border:none] p-3 -m-1 bg-transparent flex lg:hidden items-center justify-center focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 rounded"
            aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span className="flex flex-col justify-center items-center w-6 h-6 gap-1.5">
              <span
                className={`block w-6 h-0.5 bg-primary-700 rounded-full transition-all duration-300 ease-out origin-center ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-primary-700 rounded-full transition-all duration-300 ${
                  open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-primary-700 rounded-full transition-all duration-300 ease-out origin-center ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Full-screen mobile menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[60] bg-primary-50 flex flex-col items-center justify-center animate-fade-in-menu"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Uždaryti meniu"
            className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 text-primary-700 hover:bg-primary-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <nav
            className="flex flex-col items-center gap-8 text-center"
            aria-label="Meniu"
          >
            <ul className="nav-list flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, idx) => (
                <li key={href}>
                  <Link
                    ref={idx === 0 ? firstLinkRef : null}
                    href={href}
                    className={`card-heading-sm ${linkClass(href)}`}
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
