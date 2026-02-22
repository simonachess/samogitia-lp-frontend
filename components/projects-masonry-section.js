"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import ProjectCard from "./project-card";

const PAGE_SIZE = 6;
const breakpointCols = {
  default: 3,
  960: 2,
  420: 1,
};

export default function ProjectsMasonrySection({ items = [] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = items.slice(0, visible);
  const canLoadMore = visible < items.length;

  return (
    <section className="w-full bg-primary-50 md:py-[40px] py-[80px] flex flex-col items-center text-center body-regular-600">
      <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col items-center md:gap-10 gap-20 text-primary-800 font-body-regular-400">
        <div className="flex flex-col items-center gap-[24px] animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          <h2 className="page-heading">Atlikti darbai</h2>
          <div className="page-subheading">
            Čia pateikiami mūsų atlikti žemės gerbūvio darbai ir įgyvendinti
            projektai. Kokybiški sprendimai sklypų paruošimui, komunikacijų
            kasimui ir aplinkos tvarkymui.
          </div>
        </div>

        <div className="w-full text-left">
          {shown.length === 0 ? (
            <p className="text-lightslategray text-base text-center py-8">
              Informacija ruošiama...
            </p>
          ) : (
            <Masonry
              breakpointCols={breakpointCols}
              className="projects-masonry-grid"
              columnClassName="projects-masonry-grid_column"
            >
              {shown.map((it, idx) => (
                <div
                  key={it.id || `${it.title}-${idx}`}
                  className="animate-fade-in-scale opacity-0 [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${Math.min(idx * 80, 400)}ms` }}
                >
                  <ProjectCard
                    title={it.title}
                    description={it.description}
                    imageUrl={it.imageUrl}
                    imageAlt={it.imageAlt}
                    href={it.href || "/"}
                    imageWidth={it.imageWidth}
                    imageHeight={it.imageHeight}
                  />
                </div>
              ))}
            </Masonry>
          )}
        </div>

        {canLoadMore && (
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + PAGE_SIZE, items.length))
            }
            className="cursor-pointer [border:none] py-3 px-6 bg-primary-500 rounded focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <span className="text-base font-medium text-gray-white">
              Užkrauti daugiau
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
