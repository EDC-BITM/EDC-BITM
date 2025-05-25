import blob from "/blobs.png";
import blobR from "/blobR.png";
import SpeakerCard from "./SpeakerCard";
import speakers from "./speakers";
import "./speakerpage.css";
import { motion } from "framer-motion"; 


const upVariant = {
  show: { y: 0, opacity: 1 },
  hover: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

const downVariant = {
  show: { y: 40, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

function Speakerpage() {
  return (
    <>
      <div className="flex flex-col items-center w-screen">
        <div className="speakerbg h-auto w-full text-white bg-cover">
          <div className="h-screen md:text-[50px] backdrop-brightness-50 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl sm:text-6xl uppercase font-extrabold sm:p-4 text-white">
              <motion.div
                initial="show"
                whileHover="hover"
                className="overflow-hidden cursor-default lg:h-14 relative"
              >
                <motion.div className="absolute inset-0" variants={upVariant}>
                  Noteworthy Entrepreneurs
                </motion.div>
                <motion.div variants={downVariant}>
                  Noteworthy Entrepreneurs
                </motion.div>
              </motion.div>

              <motion.div
                initial="show"
                whileHover="hover"
                className="overflow-hidden cursor-default lg:h-14 relative"
              >
                <motion.div className="absolute inset-0" variants={upVariant}>
                  Who Graced Our Events
                </motion.div>
                <motion.div variants={downVariant}>
                  Who Graced Our Events
                </motion.div>
              </motion.div>
            </h1>
          </div>
        </div>

        <div className="lg:m-20 pl-12 pr-12 lg:pl-12 lg:pr-12 w-full">
          <div className="flex flex-row justify-start items-center pt-8 md:p-0 mb-6">
            <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
            <h1 className="text-[20px] sm:text-[25px] ml-[-35px] font-bold">
              Notable Past Speakers
            </h1>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 md:p-8 gap-8 pb-8">
            {speakers.map((speaker, index) => (
              <SpeakerCard
                key={speaker.name + index}
                image={speaker.image}
                name={speaker.name}
                title={speaker.title}
              />
            ))}
          </div>
        </div>
      </div>

      <img src={blob} className="blob11 -z-10 mt-10" alt="Blob decoration" />
      <img src={blob} className="blob22 -z-10" alt="Blob decoration" />
      <img src={blobR} className="blob55 -z-10" alt="Blob decoration" />
    </>
  );
}

export default Speakerpage;
