import "antd/dist/antd.min.css";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col py-[120px] px-[30px] items-center bg-[url(/hero-section@3x.png)] bg-cover bg-no-repeat bg-[top] text-center text-33xl text-gray-white font-body-regular-400">
      <div className="w-full flex flex-col items-center justify-center gap-[62px]">
        <div className="flex flex-col items-center gap-20 max-w-[720px]">
          <div className="relative leading-[72px] font-semibold">
            Žemės gerbūvio darbai
          </div>
          <div className="relative text-xl leading-[28px] font-body-regular-600 text-primary-50">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Proin sodales ultrices nulla blandit
            volutpat.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
