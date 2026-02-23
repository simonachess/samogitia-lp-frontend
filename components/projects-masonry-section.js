"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import ProjectCard from "./project-card";
import EmptyState from "./empty-state";

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
    <section className="page-section" aria-labelledby="projects-heading">
      <div className="page-container page-section-inner text-primary-800 font-body-regular-400">
        <div className="page-heading-block animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
          <h2 id="projects-heading" className="page-heading">
            Atlikti darbai
          </h2>
          <div className="page-subheading">
            Čia pateikiami mūsų atlikti žemės gerbūvio darbai ir įgyvendinti
            projektai. Kokybiški sprendimai sklypų paruošimui, komunikacijų
            kasimui ir aplinkos tvarkymui.
          </div>
        </div>

        <div className="w-full text-left">
          {shown.length === 0 ? (
            <EmptyState message="Šiuo metu neturime atliktų darbų. Norite sužinoti daugiau apie mūsų paslaugas? Susisiekite su mumis." />
          ) : (
            <Masonry
              breakpointCols={breakpointCols}
              className="projects-masonry-grid"
              columnClassName="projects-masonry-grid_column"
            >
              {shown.map((it, idx) => (
                <article
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
                </article>
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
            className="btn-primary"
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
