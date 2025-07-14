import blobL from "@assets/blobs/blobL.png?w=200&format=webp&quality=50&as=meta";
import blobR from "@assets/blobs/blobR.png?w=200&format=webp&quality=50&as=meta";
import SpeakerCard from "./SpeakerCard";
import speakersMeta from "./speakersMeta";
import "./speakerpage.css";
import { motion } from "framer-motion";
import CldImage from "@/components/Images/CldImage";
import HoverTextTranslateEffect from "@/components/Animations/HoverTextTranslate";

function Speakerpage() {
  const speakers = speakersMeta;

  return (
    <div className="flex flex-col items-center w-screen overflow-hidden relative min-h-screen">
      {/* /* Hero Section */}
      <div className="relative w-full flex items-center justify-center min-h-screen ">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <CldImage
            src="speakersbg2_qxr6f8"
            alt="Speakers Background"
            height={1080}
            width={1920}
            className="w-full h-full object-cover scale-105 brightness-50 custom-object-right-mobile"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-white drop-shadow-lg text-center"
          >
            <HoverTextTranslateEffect
              firstLine="India’s finest speakers"
              secondLine="at BIT Mesra"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="mt-8 text-lg sm:text-2xl text-gray-200 max-w-2xl text-center flex flex-wrap justify-center gap-x-2"
          >
            {"Meet the visionaries, innovators, and leaders who have inspired generations at EDC BIT Mesra"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>
        </div>
      </div>
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center tracking-wide"
        >
          Notable Past Speakers
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {speakers.map(({ key, ...rest }) => (
            <motion.div
              key={key}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
              }}
            >
              <SpeakerCard {...rest} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Blobs */}
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[13rem] z-[-10] left-0 top-[53rem] opacity-60 blur-sm pointer-events-none
              max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[13rem] z-[-10] right-0 top-[78rem] opacity-60 blur-sm pointer-events-none
              max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[14rem] z-[-10] left-0 top-[120rem] opacity-60 blur-sm pointer-events-none
              max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-[-10] right-0 top-[180rem] opacity-60 blur-sm pointer-events-none
              max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[12rem] z-[-10] left-0 top-[230rem] opacity-60 blur-sm pointer-events-none
              max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-[-10] right-0 top-[300rem] opacity-60 blur-sm pointer-events-none
              max-[649px]:w-0"
      />
    </div>
  );
}

export default Speakerpage;
