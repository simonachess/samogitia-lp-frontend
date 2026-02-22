"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function ServicesAccordion({ items = [] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="w-full space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-primary-200 bg-gray-white overflow-hidden transition-shadow hover:shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center gap-4 md:gap-6 py-4 md:py-5 px-4 md:px-6 text-left no-underline focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-inset"
              aria-expanded={isOpen}
              aria-controls={`service-content-${item.id}`}
              id={`service-trigger-${item.id}`}
            >
              {item.iconUrl && (
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.iconUrl}
                    alt={item.iconAlt ?? item.title}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="section-heading text-primary-800 flex-1">
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 text-primary-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              id={`service-content-${item.id}`}
              role="region"
              aria-labelledby={`service-trigger-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 border-t border-primary-100">
                  {item.description && (
                    <p className="font-body-regular-400 text-base text-lightslategray leading-[26px] pt-4">
                      {item.description}
                    </p>
                  )}
                  {item.slug && (
                    <Link
                      href={`/paslaugos/${item.slug}`}
                      className="inline-flex items-center gap-2 mt-4 text-primary-600 font-medium text-sm hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded"
                    >
                      Sužinoti daugiau
                      <ArrowRight className="w-4 h-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
