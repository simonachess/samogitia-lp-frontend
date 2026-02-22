"use client";

import { useState } from "react";
import ServiceCard from "./service-card";

const PAGE_SIZE = 6;

const ServicesContainer = ({ items = [] }) => {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = items.slice(0, visible);
  const canLoadMore = visible < items.length;

  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] mx-auto px-4 w-full items-center flex flex-col items-center justify-start md:gap-10 gap-20 text-center text-primary-800 font-body-regular-400">
        <div className="flex flex-col items-center gap-[24px] animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          <h2 className="page-heading">Atlikti darbai</h2>
          <div className="page-subheading">
            Čia pateikiami mūsų atlikti žemės gerbūvio darbai ir įgyvendinti
            projektai. Kokybiški sprendimai sklypų paruošimui, komunikacijų
            kasimui ir aplinkos tvarkymui.
          </div>
        </div>

        <div className="flex flex-wrap py-0 px-2.5 box-border items-start justify-center text-left text-base text-gray-white">
          <div className="flex flex-col items-center justify-start gap-[24px]">
            <div className="grid grid-cols-3 gap-[26px] lg:grid-cols-2 md:grid-cols-1">
              {shown.length === 0 ? (
                <p className="text-lightslategray text-base col-span-full text-center">
                  Informacija ruošiama...
                </p>
              ) : (
                shown.map((it, idx) => (
                  <div
                    key={it.id || `${it.title}-${idx}`}
                    className="animate-fade-in-scale opacity-0 [animation-fill-mode:forwards]"
                    style={{ animationDelay: `${Math.min(idx * 80, 400)}ms` }}
                  >
                    <ServiceCard
                      title={it.title}
                      description={it.description}
                      imageUrl={it.imageUrl}
                      imageAlt={it.imageAlt}
                      href={it.href || "/"}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {canLoadMore && (
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + PAGE_SIZE, items.length))
            }
            className="cursor-pointer [border:none] py-3 px-6 bg-primary-500 rounded flex flex-row items-start justify-start focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <div className="relative text-base leading-[24px] font-medium font-body-regular-400 text-gray-white text-center">
              Užkrauti daugiau
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

export default ServicesContainer;
