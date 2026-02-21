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
      className="cursor-pointer [text-decoration:none] rounded-lg h-[320px] w-[320px] flex flex-row items-start justify-start relative bg-cover bg-no-repeat bg-[top] text-left text-5xl text-gray-white font-body-regular-400"
      style={cardStyle}
    >
      <div className="absolute bottom-2 left-2 right-2 flex flex-col items-start justify-start gap-1 z-[0] bg-gray-white/60 rounded p-2">
        <h2 className="card-heading">{title}</h2>
      </div>
    </Link>
  );
};

export default ServiceCard;
