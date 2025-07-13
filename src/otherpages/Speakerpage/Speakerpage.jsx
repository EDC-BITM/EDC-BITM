import { useEffect, useState } from "react";
import blob from "/blobs.png";
import blobR from "/blobR.png";
import SpeakerCard from "./SpeakerCard";
import speakersMeta from "./speakersMeta";              
import "./speakerpage.css";
import { motion } from "framer-motion";


const upVariant = {
  show: { y: 0, opacity: 1 },
  hover: { y: -40, opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } },
};
const downVariant = {
  show: { y: 40, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.25, ease: "easeInOut" } },
};

function Speakerpage() {
  const [speakers, setSpeakers] = useState([]);

  
  useEffect(() => {
    fetch(
      "https://edc-cloudinary.salillakra-dev.workers.dev/data/Speakers/gallery"
    )
      .then((r) => r.json())
      .then((cdn) => {
        
        const hasImg = {};
        cdn.forEach((d) => (hasImg[d.publicId] = true));

        
        setSpeakers(
          speakersMeta.map((m) => ({
            ...m,
            
            publicId: hasImg[m.publicId] ? m.publicId : "",
          }))
        );
      })
      .catch(console.error);
  }, []);

  return (
    <>
      
      <div className="flex flex-col items-center w-screen">
        <div className="speakerbg min-h-[90vh] w-full text-white bg-cover bg-center bg-no-repeat">
          <div className="h-screen backdrop-brightness-50 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl sm:text-6xl uppercase font-extrabold sm:p-4">
              
              <motion.div initial="show" whileHover="hover" className="overflow-hidden lg:h-14 relative">
                <motion.div variants={upVariant} className="absolute inset-0">
                  India’s finest speakers
                </motion.div>
                <motion.div variants={downVariant}>Visionaries</motion.div>
              </motion.div>

              <motion.div initial="show" whileHover="hover" className="overflow-hidden lg:h-14 relative">
                <motion.div variants={upVariant} className="absolute inset-0">
                  at EDC BIT Mesra
                </motion.div>
                <motion.div variants={downVariant}>who redefined success</motion.div>
              </motion.div>
            </h1>
          </div>
        </div>

        
        <div className="lg:m-20 px-12 w-full">
          <h1 className="text-[20px] sm:text-[25px] font-bold mb-6">
            Notable Past Speakers
          </h1>

          <div className="grid md:grid-cols-3 grid-cols-1 md:p-8 gap-8 pb-8">
            {speakers.map((sp) => (
              <SpeakerCard key={sp.key} {...sp} />
            ))}
          </div>
        </div>
      </div>

      
      <img src={blob}  className="blob11 -z-10 mt-10" alt="" />
      <img src={blob}  className="blob22 -z-10"     alt="" />
      <img src={blobR} className="blob55 -z-10"      alt="" />
    </>
  );
}

export default Speakerpage;
