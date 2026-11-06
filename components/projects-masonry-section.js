"use client";

import { useState } from "react";
import ProjectCard from "./project-card";
import EmptyState from "./empty-state";

const PAGE_SIZE = 6;

export default function ProjectsMasonrySection({ items = [] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = items.slice(0, visible);
  const canLoadMore = visible < items.length;

  return (
    <section className="projects-page" aria-labelledby="projects-heading">
      <div className="projects-page-container">
        <div className="projects-page-heading">
          <h1 id="projects-heading" className="projects-page-title">
            Atlikti darbai
          </h1>
          <p>
            Čia pateikiami mūsų atlikti žemės gerbūvio darbai ir įgyvendinti
            projektai. Kokybiški sprendimai sklypų paruošimui, komunikacijų
            kasimui ir aplinkos tvarkymui.
          </p>
        </div>

        <div className="projects-page-grid">
          {shown.length === 0 ? (
            <EmptyState message="Šiuo metu neturime atliktų darbų. Norite sužinoti daugiau apie mūsų paslaugas? Susisiekite su mumis." />
          ) : (
            shown.map((it, idx) => (
              <article
                key={it.id || `${it.title}-${idx}`}
                className="projects-page-item"
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
            ))
          )}
        </div>

        {canLoadMore && (
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + PAGE_SIZE, items.length))
            }
            className="button button-primary projects-load-more"
          >
            Užkrauti daugiau
          </button>
        )}
      </div>
    </section>
  );
}
