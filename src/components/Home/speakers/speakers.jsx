import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeUpAnimation from "@animations/FadeUp.jsx";
import cldImageData from "@/data/CldImage.json";
import CldImage from "@/components/Images/CldImage";

const speakersData = [
  ...cldImageData.Home.pastSpeakers,
  ...cldImageData.Home.pastSpeakers,
];

function Speakers() {
  return (
    <>
      <FadeUpAnimation>
        <div className="glass-morphic lg:m-20 p-4 lg:p-12 shadow-2xl rounded-2xl">
          <div className="p-4">
            <div className="flex flex-row justify-start items-center">
              <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
              <h1 className="text-[25px] ml-[-25px] font-bold">Speakers</h1>
            </div>
            <div className="mt-6 mb-12">
              <h1 className="lg:text-[35px] text-2xl font-bold">
                Some Past Speakers
              </h1>
            </div>
          </div>

          <div className="flex relative overflow-hidden min-h-[400px] sm:h-auto">
            <motion.div
              id="speakers-carousel"
              className="flex space-x-6 flex-nowrap"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration: 18,
              }}
            >
              {speakersData.map((speaker, idx) => (
                <div
                  key={`speaker-${idx}`}
                  className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end"
                >
                  <CldImage
                    height={300}
                    width={300}
                    loading="lazy"
                    src={speaker.publicId}
                    alt={speaker.alt}
                  />
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {speaker.name}
                  </h3>
                  <p className="text-center">{speaker.description}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Link spy={true} smooth={true} to="/Speakers">
              <button className="transition ease-in-out hover:scale-110 p-4 rounded-xl bg-[#FED853] font-bold mt-[-50px]">
                Know More
              </button>
            </Link>
          </div>
        </div>
      </FadeUpAnimation>
    </>
  );
}

export default Speakers;
