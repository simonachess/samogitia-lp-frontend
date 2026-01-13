// header.js
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

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
    <header className="self-stretch bg-gray-white h-[98px] flex flex-row py-4 px-20 box-border items-center justify-center sticky w-full top-0 [background:white] z-[50] text-center text-5xl text-primary-500 font-body-regular-600 lg:pl-10 lg:pr-10 lg:box-border md:pl-6 md:pr-6 md:box-border">
      <div className="flex-1 flex flex-row items-center justify-between">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-[8px]"
        >
          <img className="relative w-auto h-20" alt="logo" src="/logo.svg" />
        </Link>

        {/* Desktop nav */}
        <div className="flex flex-row items-center justify-end gap-[36px] text-sm text-primary-900">
          <div className="flex flex-row items-start justify-start gap-[30px] lg:hidden">
            <a href="#services" className="relative leading-[22px]">
              PASLAUGOS
            </a>
            <a href="#works" className="relative leading-[22px]">
              ATLIKTI DARBAI
            </a>
            <a href="#about" className="relative leading-[22px]">
              APIE MUS
            </a>
            <a href="#contacts" className="relative leading-[22px]">
              KONTAKTAI
            </a>
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
                className="p-2"
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

            <a
              href="#services"
              onClick={() => setOpen(false)}
              className="text-primary-900"
            >
              PASLAUGOS
            </a>
            <a
              href="#works"
              onClick={() => setOpen(false)}
              className="text-primary-900"
            >
              ATLIKTI DARBAI
            </a>
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-primary-900"
            >
              APIE MUS
            </a>
            <a
              href="#contacts"
              onClick={() => setOpen(false)}
              className="text-primary-900"
            >
              KONTAKTAI
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
