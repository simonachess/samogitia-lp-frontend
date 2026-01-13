import InfoCard from "./info-card";

const FeatureContainer = () => {
  return (
    <div
      id="services"
      className="self-stretch bg-primary-50 flex flex-col py-[70px] px-0 items-center justify-start text-center text-21xl text-primary-800 font-body-regular-600"
    >
      <div className="self-stretch flex flex-col px-0 pb-0 box-border items-center justify-start gap-[54px]">
        <div className="self-stretch flex flex-col py-0 px-[30px] box-border items-center justify-start gap-[24px]">
          <div className="self-stretch relative leading-[48px] font-semibold">
            Paslaugos
          </div>
          <div className="self-stretch relative text-xl leading-[28px] text-lightslategray">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin sodales ultrices nulla blandit
            volutpat.
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-center gap-[86px] text-5xl text-gray-700">
          <InfoCard
            featureId="/icon.svg"
            featureText="Sell your home"
            featureDescription="Description 1"
          />
          <InfoCard
            featureId="/icon1.svg"
            featureText="Rent your home"
            featureDescription="Description 2"
            propWidth="312px"
          />
          <InfoCard
            featureId="/icon2.svg"
            featureText="Buy a home"
            featureDescription="Description 3"
            propWidth="unset"
          />
          <InfoCard
            featureId="/icon3.svg"
            featureText="Free marketing"
            featureDescription="Description 4"
            propWidth="312px"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureContainer;
