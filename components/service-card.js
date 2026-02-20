// service-card.js
"use client";

import { useMemo } from "react";
import Link from "next/link";

const ServiceCard = ({
  title = "Title",
  description = "",
  propBackgroundImage,
  propPadding,
  propBoxSizing,
  href = "/", // 👈 new
}) => {
  const cardStyle = useMemo(() => {
    return {
      backgroundImage: propBackgroundImage,
      padding: propPadding,
      boxSizing: propBoxSizing,
    };
  }, [propBackgroundImage, propPadding, propBoxSizing]);

  return (
    <Link
      href={href}
      className="cursor-pointer [text-decoration:none] rounded-lg h-[241px] flex flex-row items-start justify-start relative bg-cover bg-no-repeat bg-[top] text-left text-5xl text-gray-white font-body-regular-600"
      style={cardStyle}
    >
      <div className="my-0 mx-[!important] absolute top-[16px] left-[16px] flex flex-col items-start justify-start gap-[11px] z-[0]">
        <h2 className="card-heading">{title}</h2>
        {description && (
          <p className="relative text-base leading-[24px]">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default ServiceCard;
