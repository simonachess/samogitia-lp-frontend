// header.js
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/paslaugos")
      return pathname === "/paslaugos" || pathname.startsWith("/paslaugos/");
    return pathname === href;
  };

  const linkClass = (href) =>
    `relative leading-[22px] text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded ${
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

  const navLinks = [
    { href: "/paslaugos", label: "PASLAUGOS" },
    { href: "/nuoma", label: "NUOMA" },
    { href: "/projektai", label: "ATLIKTI DARBAI" },
    { href: "/apie", label: "APIE MUS" },
    { href: "/kontaktai", label: "KONTAKTAI" },
  ];

  return (
    <header className="bg-gray-white md:h-[76px] h-[98px] flex flex-row md:py-2 py-4 box-border items-center justify-between sticky w-full top-0 [background:white] z-[50] text-center text-base text-primary-500 font-body-regular-400">
      <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-row items-center justify-between w-full">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-[8px] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded"
        >
          <img
            className="relative w-auto md:h-[60px] h-20"
            alt="logo"
            src="/logo.svg"
            width={204}
            height={80}
          />
        </Link>

        {/* Desktop nav */}
        <div className="flex flex-row items-center justify-end gap-[36px] text-sm text-primary-900">
          <div className="flex flex-row items-start justify-start gap-[30px] lg:hidden">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile burger – animated */}
          <button
            type="button"
            className="cursor-pointer [border:none] p-3 -m-1 bg-transparent hidden lg:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded"
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
        </div>
      </div>

      {/* Full-screen mobile menu */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[60] bg-primary-50 flex flex-col items-center justify-center lg:flex animate-fade-in-menu"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Uždaryti meniu"
            className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 text-primary-700 hover:bg-primary-100"
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
          <nav className="flex flex-col items-center gap-8 text-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`card-heading-sm ${linkClass(href)}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
