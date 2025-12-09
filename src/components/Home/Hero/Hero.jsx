import { scroller } from "react-scroll";
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
      className="relative z-10 flex h-28 sm:h-36 items-center justify-center w-full px-4 py-2 sm:px-6"
    >
      <motion.img
        src={IATLogo}
        alt="IAT Logo"
        className="w-80 md:w-[30rem] max-w-full h-auto drop-shadow-lg transition-transform duration-300 ease-in-out"
        whileHover={{
          scale: 1.05,
          filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
      />
    </NavLink>
  );
};

const SubmissionButton = () => {
  // Animation variants for the button
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  // Animation for the "Share your ideas" text
  const textVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: "linear",
      },
    },
  };

  return (
    <NavLink to="/submissions" className="relative z-20">
      <motion.div
        className="backdrop-blur-md bg-black/40 text-white font-bold py-3 px-6 rounded-lg
                  shadow-lg flex items-center gap-4 overflow-hidden border border-white/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            "0px 0px 0px rgba(255, 255, 255, 0)",
            "0px 0px 15px rgba(255, 165, 0, 0.5)", // Orangeish glow for startup/rocket theme
            "0px 0px 0px rgba(255, 255, 255, 0)",
          ],
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          boxShadow: { repeat: Infinity, duration: 2.5 },
        }}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <motion.div className="relative z-10 flex items-center gap-3">
          {/* Rocket Icon */}
          <motion.div
            animate={{
              y: [0, -3, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          </motion.div>

          <div className="flex flex-col items-start">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-90 text-gray-300">
              Got a groundbreaking vision?
            </span>
            <motion.span
              className="text-sm sm:text-base font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-[length:200%_auto]"
              variants={textVariants}
              animate="animate"
            >
              SHARE YOUR IDEAS RIGHT HERE
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
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
          className="group mt-8 mb-6 duration-150 ease-in-out cursor-pointer hover:bg-[whitesmoke] rounded-[10px] text-2xl border border-white hover:scale-110 backdrop-blur-sm text-black h-auto"
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
          </div>
        </div> */}

        {/* Submission Button */}
        <div className="mt-8 relative">
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
          >
            {/* Notification Dot - Pulse effect for 'New' */}
            <motion.div
              className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-500 rounded-full z-30"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
              }}
            />
            <SubmissionButton />
          </motion.div>
        </div>

        {/* // IAT Redirect */}

        {/* <IATLink /> */}
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