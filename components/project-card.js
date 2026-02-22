"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({
  title = "Title",
  description = "",
  imageUrl,
  imageAlt = "Atliktas projektas",
  href = "/",
  imageWidth = 1200,
  imageHeight = 800,
}) {
  const isVertical = imageHeight > imageWidth;
  // Vertical: 50% of natural height so the card isn’t too tall; image fills with cover (full image on click-through)
  const aspectW = isVertical ? 2 * imageWidth : imageWidth;
  const aspectH = imageHeight;

  return (
    <Link
      href={href}
      className="block w-full rounded-xl border border-primary-100 bg-gray-white overflow-hidden text-left no-underline transition-all hover:border-primary-200 hover:shadow-md focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1"
    >
      <div
        className="w-full relative overflow-hidden bg-primary-100"
        style={{ aspectRatio: `${aspectW}/${aspectH}` }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className={
            isVertical ? "object-cover object-center" : "object-contain"
          }
          sizes="(max-width: 420px) 100vw, (max-width: 960px) 50vw, 400px"
          quality={90}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h2
          className="text-lg md:text-base font-semibold text-primary-800 truncate"
          title={title}
        >
          {title}
        </h2>
        {description && (
          <p
            className="text-sm text-lightslategray leading-relaxed truncate"
            title={description}
          >
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
