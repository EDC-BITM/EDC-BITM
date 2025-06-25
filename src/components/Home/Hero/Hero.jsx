import { scroller } from "react-scroll";
import { motion } from "framer-motion";
import CldImageData from "@/data/CldImage.json";
import CldImage from "../../Images/CldImage";
import blobL from "@assets/blobs/blobL.png?w=200&format=webp&quality=50&as=meta";
import blobR from "@assets/blobs/blobR.png?w=200&format=webp&quality=50&as=meta";

function Hero() {
  // These variants define the initial and hover states for the text
  // The `show` state is the initial state, and the `hover` state is the state when the text is hovered over
  const upvarient = {
    show: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -40,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  const downvarient = {
    show: {
      y: 40,
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  console.log("blobs", blobL, blobR);
  const heroImage = CldImageData.Home.hero[0];
  return (
    <div className="h-screen p-0 w-full m-0">
      <div className="sm:h-full relative h-screen w-screen bg-no-repeat sm:w-full p-0 m-0 box-border bg-center flex flex-col b-body justify-center items-center bg-cover ">
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
        <div className="w-full max-h-[300px] flex items-center justify-center text-6xl font-black px-[50px] py-[20px] mb-[30px]">
          <h1 className="text-center tracking-tighter [word-spacing:0.09em] text-3xl md:text-5xl lg:text-6xl uppercase text-white font-bold">
            <motion.div
              initial="show"
              whileHover="hover"
              className="overflow-hidden cursor-default lg:h-14 relative"
            >
              <motion.div className="absolute inset-0" variants={upvarient}>
                Igniting the innovation
              </motion.div>
              <motion.div variants={downvarient}>
                Igniting the innovation
              </motion.div>
            </motion.div>
            <motion.div
              initial="show"
              whileHover="hover"
              className="overflow-hidden h-24 cursor-default lg:h-14 relative"
            >
              <motion.div className="absolute  inset-0" variants={upvarient}>
                within upcoming ground breakers.
              </motion.div>
              <motion.div variants={downvarient}>
                within upcoming ground breakers.
              </motion.div>
            </motion.div>
          </h1>
        </div>
        <div
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
          </div>
        </div>
      </div>

      {/* Blobs */}
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
