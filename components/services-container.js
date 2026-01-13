// services-container.js
import { useMemo, useState } from "react";
import ServiceCard from "./service-card";

const ServicesContainer = () => {
  const items = useMemo(
    () => [
      {
        title: "Centerville",
        description: "Description",
        bg: `url("/card-1@3x.png")`,
      },
      {
        title: "Centerville",
        description: "Description",
        bg: `url("/card-2@3x.png")`,
      },
      {
        title: "Centerville",
        description: "Description",
        bg: `url("/card-3@3x.png")`,
      },
      {
        title: "Arlington",
        description: "Description",
        bg: `url("/card-4@3x.png")`,
      },
      {
        title: "Centerville",
        description: "Description",
        bg: `url("/card-5@3x.png")`,
      },
      // add more here
      {
        title: "Vilnius",
        description: "Description",
        bg: `url("/card-6@3x.png")`,
      },
      {
        title: "Kaunas",
        description: "Description",
        bg: `url("/card-7@3x.png")`,
      },
    ],
    []
  );

  const PAGE_SIZE = 5;
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = items.slice(0, visible);
  const canLoadMore = visible < items.length;

  return (
    <div
      id="works"
      className="self-stretch flex-1 flex flex-col py-[53px] px-[50px] items-center justify-start gap-[45px] text-center text-21xl text-primary-800 font-body-regular-600"
    >
      <div className="self-stretch flex flex-col py-0 px-[30px] items-center justify-start gap-[24px] md:self-stretch md:w-auto">
        <div className="self-stretch relative leading-[48px] font-semibold">
          Atlikti darbai
        </div>
        <div className="self-stretch relative text-xl leading-[28px] text-lightslategray">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae.
        </div>
      </div>

      <div className="self-stretch flex-1 flex flex-row flex-wrap py-0 px-2.5 box-border items-start justify-center text-left text-5xl text-gray-white">
        <div className="self-stretch flex-1 flex flex-col items-center justify-start gap-[24px] max-w-[1300px]">
          <div className="self-stretch grid grid-cols-3 gap-[26px] lg:grid-cols-2 md:grid-cols-1">
            {shown.map((it, idx) => (
              <ServiceCard
                key={`${it.title}-${idx}`}
                title={it.title}
                description={it.description}
                propBackgroundImage={it.bg}
                propPadding="unset"
                propBoxSizing="unset"
              />
            ))}
          </div>
        </div>
      </div>

      {canLoadMore && (
        <button
          type="button"
          onClick={() =>
            setVisible((v) => Math.min(v + PAGE_SIZE, items.length))
          }
          className="cursor-pointer [border:none] py-3 px-6 bg-primary-500 rounded flex flex-row items-start justify-start"
        >
          <div className="relative text-base leading-[24px] font-medium font-body-regular-600 text-gray-white text-center">
            Užkrauti daugiau
          </div>
        </button>
      )}
    </div>
  );
};

export default ServicesContainer;
