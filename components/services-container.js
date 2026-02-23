"use client";

import { useState } from "react";
import ServiceCard from "./service-card";
import EmptyState from "./empty-state";

const PAGE_SIZE = 6;

const ServicesContainer = ({ items = [] }) => {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = items.slice(0, visible);
  const canLoadMore = visible < items.length;

  return (
    <section className="page-section" aria-labelledby="services-heading">
      <div className="page-container page-section-inner text-center text-primary-800 font-body-regular-400">
        <div className="page-heading-block animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          <h2 id="services-heading" className="page-heading">
            Atlikti darbai
          </h2>
          <div className="page-subheading">
            Čia pateikiami mūsų atlikti žemės gerbūvio darbai ir įgyvendinti
            projektai. Kokybiški sprendimai sklypų paruošimui, komunikacijų
            kasimui ir aplinkos tvarkymui.
          </div>
        </div>

        <div className="flex flex-wrap py-0 px-2.5 box-border items-start justify-center text-left text-base text-gray-white">
          <div className="flex flex-col items-center justify-start gap-[24px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
              {shown.length === 0 ? (
                <div className="col-span-full">
                  <EmptyState message="Šiuo metu neturime atliktų darbų. Norite sužinoti daugiau apie mūsų paslaugas? Susisiekite su mumis." />
                </div>
              ) : (
                shown.map((it, idx) => (
                  <article
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
                  </article>
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
            className="btn-primary"
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
