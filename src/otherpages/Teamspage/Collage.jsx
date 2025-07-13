import CldImage from "@/components/Images/CldImage";
import { motion } from "framer-motion";

function Collage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-black overflow-hidden">
      <CldImage
        src="teambg_kziltz"
        alt="Background"
        width={1920}
        height={1080}
        className="absolute inset-0 object-cover opacity-40 z-0 select-none pointer-events-none"
        draggable={false}
      />
      {/* Overlay: more blackish */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div className="relative z-20 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg mb-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, type: "spring" }}
              className="block"
            >
              MEET
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, type: "spring" }}
              className="block"
            >
              THE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="block"
            >
              TEAM
            </motion.div>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, type: "spring" }}
            className="text-base sm:text-lg text-gray-200 max-w-xs sm:max-w-md text-center lg:text-left"
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textShadow: "0 1px 8px rgba(0,0,0,0.18)",
            }}
          >
            Creative minds, passionate hearts, and unstoppable energy. Get to
            know the people behind our success.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default Collage;
