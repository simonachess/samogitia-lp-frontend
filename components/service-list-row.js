"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function ServiceListRow({
  title,
  description,
  iconUrl,
  iconAlt,
  href,
}) {
  const content = (
    <>
      {iconUrl && (
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center overflow-hidden">
          <Image
            src={iconUrl}
            alt={iconAlt ?? title}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="section-heading text-primary-800">{title}</h3>
        {description && (
          <p className="font-body-regular-400 text-base text-lightslategray leading-[26px] mt-1">
            {description}
          </p>
        )}
      </div>
      <span className="flex-shrink-0 flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
        Sužinoti daugiau
        <ChevronRight className="w-4 h-4" aria-hidden />
      </span>
    </>
  );

  const rowClass =
    "flex flex-wrap items-start gap-4 md:gap-6 py-6 md:py-8 text-left border-b border-primary-100 last:border-b-0";

  return href ? (
    <Link
      href={href}
      className={`group no-underline rounded-lg -mx-2 px-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 hover:bg-primary-50/50 transition-colors ${rowClass}`}
    >
      {content}
    </Link>
  ) : (
    <div className={rowClass}>{content}</div>
  );
}
