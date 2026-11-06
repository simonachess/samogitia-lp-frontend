"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({
  title = "Title",
  description = "",
  imageUrl,
  imageAlt = "Atliktas projektas",
  href = "/",
}) {
  const descriptionText =
    typeof description === "string"
      ? description
      : Array.isArray(description)
        ? description
            .filter((block) => block._type === "block")
            .flatMap((block) =>
              (block.children || []).map((child) => child.text || ""),
            )
            .join(" ")
        : "";

  return (
    <Link href={href} className="projects-page-card group">
      <div className="projects-page-card-image">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 700px) 100vw, 50vw"
          quality={85}
        />
      </div>
      <div className="projects-page-card-copy">
        <h2 className="projects-page-card-title">{title}</h2>
        {descriptionText && (
          <p className="projects-page-card-description">{descriptionText}</p>
        )}
      </div>
    </Link>
  );
}
