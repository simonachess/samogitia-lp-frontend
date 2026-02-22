// components/service-card.js
"use client";

import Link from "next/link";
import Image from "next/image";

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
      className="cursor-pointer [text-decoration:none] rounded-lg h-[320px] w-[320px] flex flex-row items-start justify-start relative overflow-hidden text-left text-base text-gray-white font-body-regular-400 focus:outline-none focus:ring-1 focus:ring-primary-400/25 focus:ring-offset-1 transition-transform duration-300 ease-out hover:scale-[1.02]"
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 420px) 100vw, (max-width: 960px) 50vw, 320px"
        className="object-cover object-top"
      />
      <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start justify-start gap-1 z-[1] bg-gray-white/60 rounded p-2">
        <h2 className="card-heading">{title}</h2>
        {description && (
          <p className="text-sm text-gray-700 truncate leading-tight max-w-full">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ServiceCard;
