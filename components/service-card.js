// service-card.js
"use client";

import Link from "next/link";

const ServiceCard = ({
  title = "Title",
  description = "",
  imageUrl,
  imageAlt = "Atliktas projektas",
  href = "/",
}) => {
  return (
    <Link
      href={href}
      className="cursor-pointer [text-decoration:none] rounded-lg h-[320px] w-[320px] flex flex-row items-start justify-start relative overflow-hidden text-left text-5xl text-gray-white font-body-regular-400"
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start justify-start gap-1 z-[1] bg-gray-white/60 rounded p-2">
        <h2 className="card-heading">{title}</h2>
      </div>
    </Link>
  );
};

export default ServiceCard;
