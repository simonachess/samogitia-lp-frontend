import { useMemo } from "react";

const InfoCard = ({
  featureId,
  featureText,
  featureDescription,
  propWidth,
}) => {
  const featureCardStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div
      className="rounded bg-gray-white shadow-[0px_24px_68px_rgba(59,_77,_129,_0.08)] flex flex-col p-[22px] box-border items-start justify-start min-w-[300px] max-w-[340px] text-center text-5xl text-gray-700 font-body-regular-600"
      style={featureCardStyle}
    >
      <div className="flex flex-col items-start justify-start gap-[24px]">
        <img
          className="relative w-[78px] h-[78px] overflow-hidden shrink-0"
          alt=""
          src={featureId}
        />
        <div className="flex flex-col items-start justify-start gap-[24px]">
          <div className="relative leading-[32px] font-semibold">
            {featureText}
          </div>
          <div className="relative text-base leading-[24px] text-lightslategray text-left flex items-end w-[268px]">
            {featureDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
