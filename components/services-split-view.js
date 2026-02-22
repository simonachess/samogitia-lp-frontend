"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ServicesSplitView({ items = [] }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0];

  if (items.length === 0) return null;

  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-12 lg:items-start">
      {/* Nav: service names */}
      <nav
        className="flex-shrink-0 lg:w-56 lg:sticky lg:top-24 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible"
        aria-label="Paslaugos"
      >
        {items.map((item) => {
          const isActive = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-left whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 ${
                isActive
                  ? "bg-primary-500 text-gray-white font-medium"
                  : "bg-gray-white text-primary-800 hover:bg-primary-100 border border-primary-100"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {item.iconUrl && (
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center overflow-hidden ${isActive ? "bg-white/20" : "bg-primary-100"}`}
                >
                  <Image
                    src={item.iconUrl}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </span>
              )}
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Detail: selected service */}
      <div className="flex-1 min-w-0 pt-6 lg:pt-0">
        {selected && (
          <article className="rounded-xl bg-gray-white border border-primary-100 p-6 md:p-8">
            <div className="flex flex-col gap-4">
              {selected.iconUrl && (
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center overflow-hidden">
                  <Image
                    src={selected.iconUrl}
                    alt=""
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
              )}
              <h2 className="section-heading text-primary-800">
                {selected.title}
              </h2>
              {selected.description && (
                <p className="font-body-regular-400 text-base text-lightslategray leading-[26px]">
                  {selected.description}
                </p>
              )}
              {selected.slug && (
                <Link
                  href={`/paslaugos/${selected.slug}`}
                  className="inline-flex items-center gap-2 mt-2 text-primary-600 font-medium text-sm hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded"
                >
                  Sužinoti daugiau
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
