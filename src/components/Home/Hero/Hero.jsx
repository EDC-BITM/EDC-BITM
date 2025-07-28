// import { scroller } from "react-scroll";
import CldImageData from "@/data/CldImage.json";
import CldImage from "../../Images/CldImage";
import blobL from "@assets/blobs/blobL.png?w=200&format=webp&quality=50&as=meta";
import blobR from "@assets/blobs/blobR.png?w=200&format=webp&quality=50&as=meta";
import HoverTextTranslateEffect from "@/components/Animations/HoverTextTranslate";
import IATLogo from "../../../otherpages/IAT/assets/horizontalLogo.svg";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const IATLink = () => {
  return (
    <NavLink
      to="/iat"
      className="relative z-10 flex items-center justify-center w-full px-4 py-2 sm:px-6"
    >
      <motion.img
        src={IATLogo}
        alt="IAT Logo"
        className="w-64 sm:w-80 md:w-[30rem] max-w-full h-auto drop-shadow-lg transition-transform duration-300 ease-in-out"
        whileHover={{
          scale: 1.05,
          filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
      />
    </NavLink>
  );
};

function Hero() {
  const heroImage = CldImageData.Home.hero[0];
  return (
    <div className="h-screen p-0 w-full m-0">
      <div className="sm:h-full relative min-h-screen w-screen bg-no-repeat sm:w-full p-0 m-0 box-border bg-center flex flex-col b-body justify-center items-center bg-cover ">
        <div className="absolute inset-0 ">
          <CldImage
            src={heroImage.publicId}
            alt={heroImage.alt}
            height={heroImage.height}
            width={heroImage.width}
            loading="eager"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))]"></div>
        </div>
        <div className="w-full flex items-center justify-center text-6xl font-black px-[50px] pt-[20px]">
          <HoverTextTranslateEffect
            firstLine="Igniting the innovation"
            secondLine="within upcoming ground breakers."
          />
        </div>
        {/* <div
          className="group duration-150 ease-in-out cursor-pointer hover:bg-[whitesmoke]  rounded-[10px] text-2xl border border-white  hover:scale-110 backdrop-blur-sm text-black h-auto"
          onClick={() => {
            scroller.scrollTo("our_stats", {
              smooth: true,
              duration: 500,
              offset: -70,
            });
          }}
        >
          <div className="flex justify-center items-center">
            <button className="group-hover:text-black px-8 py-1.5 text-white transition ease-in-out">
              Get Started
            </button>
          </div>*/}

        {/* // IAT Redirect */}

        <IATLink />
      </div>

      <img
        src={blobL.src}
        alt="Blob 1"
        className="absolute w-64 -z-30 left-0 mt-12 md:w-64 md:mt-12 max-md:w-48 max-md:mt-[30px]"
      />
      <img
        src={blobL.src}
        alt="Blob 2"
        className="absolute w-64 -z-30 left-0 top-[165rem] md:w-64 max-md:w-48 max-md:top-[2900px]"
      />
      <img
        src={blobR.src}
        alt="Blob 3"
        className="absolute w-64 -z-30 right-0 mt-[170rem] md:w-64 max-md:w-40 max-md:top-[1630px]"
      />
      <img
        src={blobL.src}
        alt="Blob 4"
        className="absolute w-64 -z-30 left-0 top-[350rem] md:w-64 max-md:w-40 max-md:top-[6341px]"
      />
      <img
        src={blobR.src}
        alt="Blob 5"
        className="absolute w-40 -z-30 right-0 mt-[285rem] md:w-40 max-md:w-32 max-md:top-[1600px]"
      />
      <img
        src={blobR.src}
        alt="Blob 6"
        className="absolute w-64 -z-30 right-0 top-[90rem] md:w-64 max-md:w-40 max-md:top-[1400px]"
      />
    </div>
  );
}

export default Hero;
