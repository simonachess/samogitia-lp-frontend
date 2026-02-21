// header.js
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/paslaugos")
      return pathname === "/paslaugos" || pathname.startsWith("/paslaugos/");
    return pathname === href;
  };

  const linkClass = (href) =>
    `relative leading-[22px] text-primary-500 ${
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

  // close on click outside panel
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="bg-gray-white md:h-[76px] h-[98px] flex flex-row md:py-2 py-4  box-border items-center justify-between sticky w-full top-0 [background:white] z-[50] text-center text-5xl text-primary-500 font-body-regular-400">
      <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-row items-center justify-between w-full">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-[8px]"
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
            <Link href="/paslaugos" className={linkClass("/paslaugos")}>
              PASLAUGOS
            </Link>
            <Link href="/nuoma" className={linkClass("/nuoma")}>
              NUOMA
            </Link>
            <Link href="/projektai" className={linkClass("/projektai")}>
              ATLIKTI DARBAI
            </Link>
            <Link href="/apie" className={linkClass("/apie")}>
              APIE MUS
            </Link>
            <Link href="/kontaktai" className={linkClass("/kontaktai")}>
              KONTAKTAI
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="cursor-pointer [border:none] p-2 bg-[transparent] hidden lg:flex"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex justify-end lg:flex">
          <div
            ref={panelRef}
            className="w-[280px] h-full bg-white p-6 flex flex-col gap-5 shadow-xl
                       transition-transform duration-150 ease-out"
          >
            <div className="flex justify-end">
              <button
                type="button"
                className="p-2 bg-transparent [border:none] cursor-pointer"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                {/* stroke X */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <Link
              href="/paslaugos"
              className={linkClass("/paslaugos")}
              onClick={() => setOpen(false)}
            >
              PASLAUGOS
            </Link>
            <Link
              href="/nuoma"
              className={linkClass("/nuoma")}
              onClick={() => setOpen(false)}
            >
              NUOMA
            </Link>
            <Link
              href="/projektai"
              className={linkClass("/projektai")}
              onClick={() => setOpen(false)}
            >
              ATLIKTI DARBAI
            </Link>
            <Link
              href="/apie"
              className={linkClass("/apie")}
              onClick={() => setOpen(false)}
            >
              APIE MUS
            </Link>
            <Link
              href="/kontaktai"
              className={linkClass("/kontaktai")}
              onClick={() => setOpen(false)}
            >
              KONTAKTAI
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
