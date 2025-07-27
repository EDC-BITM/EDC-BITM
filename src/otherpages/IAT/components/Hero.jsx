import icon from "../assets/Frame.svg";
import iatLogo from "../assets/iatLogo.svg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock } from "react-icons/fi";

const TIMER_DURATION = 12 * 60 * 60; // 12 hours in seconds

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${mins}:${secs}`;
};

const Timer = () => {
  const [remaining, setRemaining] = useState(TIMER_DURATION);

  useEffect(() => {
    if (remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 shadow-lg text-white font-mono text-base sm:text-2xl w-fit mx-auto"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiClock className="text-xl sm:text-3xl drop-shadow-sm" />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.span
          key={remaining}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35 }}
          className="tabular-nums tracking-wide font-semibold"
        >
          {remaining > 0 ? formatTime(remaining) : "You can now register!"}
        </motion.span>
      </AnimatePresence>

      {remaining > 0 && (
        <span className="text-xs sm:text-sm font-medium text-white/70">
          left to register
        </span>
      )}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="flex justify-center mt-32 sm:mt-32 lg:mt-36 px-4">
      <div className="flex w-full max-w-[90%] sm:max-w-[70%] flex-col items-center justify-center gap-4 mb-8 text-white">
        {/* Announcement Bar */}
        <div className="flex px-3 lg:translate-y-10 rounded-2xl py-1.5 bg-gradient-to-r from-[#E59CFF3D] via-[#BA9CFF3D] to-[#9CB2FF3D] items-center justify-center gap-2 text-white text-xs sm:text-sm">
          <img src={icon} className="w-4 h-4 sm:w-5 sm:h-5" alt="Event Icon" />
          <span>New: Check our Schedule</span>
        </div>

        {/* Heading and Logo */}
        <div className="text-center flex flex-col items-center font-semibold leading-tight sm:leading-[10rem] text-white">
          <h1 className="text-5xl sm:text-5xl md:text-[5rem] lg:text-[8rem] xl:text-[10rem] leading-[1.2] px-2">
            <span className="whitespace-nowrap">Welcome to</span>
          </h1>
          <div className="flex items-center h-72 sm:h-auto justify-center w-full sm:-my-24">
            <img
              draggable="false"
              loading="lazy"
              width="1480"
              height="auto"
              src={iatLogo}
              className="w-full sm:w-[90%] md:w-[60%] h-auto max-w-full"
              alt="Innovate-A-Thon Logo"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-center  -translate-y-8  sm:-translate-y-4 text-white text-base sm:text-xl leading-relaxed sm:leading-[1.85625rem] max-w-[90%] sm:max-w-[52.75rem]">
          Think beyond code and business plans. From ideation to execution,
          you’ll be immersed in a space where entrepreneurship meets futuristic
          tech, turning concepts into real-world impact.
        </p>

        <Timer />

        {/* Registration Section */}
        {/* <div className="relative w-full min-h-[8rem] sm:min-h-[10rem] flex flex-col items-center justify-center bg-transparent px-4">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 w-full max-w-lg sm:max-w-none">
            {/* Left Button 
            <div className="relative w-full sm:w-auto sm:mr-4">
              <svg
                className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-44"
                width="531"
                height="2"
                viewBox="0 0 531 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M531 1H1.68807e-05"
                  stroke="url(#paint0_linear_16_2690)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16_2690"
                    x1="531"
                    y1="1.5"
                    x2="0"
                    y2="1.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#030014" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  borderRadius: "0.625rem",
                  background:
                    "radial-gradient(231.94% 231.94% at 50% 100%, #8A6CFF 0%, rgba(53, 41, 128, 0.00) 25.24%), linear-gradient(180deg, rgba(243, 238, 255, 0.00) 0%, rgba(243, 238, 255, 0.04) 100%), rgba(147, 130, 255, 0.01)",
                  boxShadow:
                    "0 2px 5px 0 rgba(16, 0, 51, 0.39), 0 8px 8px 0 rgba(16, 0, 51, 0.34), 0 19px 11px 0 rgba(16, 0, 51, 0.20), 0 34px 14px 0 rgba(16, 0, 51, 0.06), 0 53px 15px 0 rgba(16, 0, 51, 0.01), 0 0 12px 0 rgba(255, 255, 255, 0.08) inset, 0 -8px 32px 0 #1E0D49 inset",
                }}
                className="w-full sm:w-auto px-6 py-3 text-white font-semibold text-sm sm:text-base text-center min-w-[140px]"
              >
                REGISTER WITH
                <br />
                UNSTOP
              </motion.button>
            </div>

            {/* Middle Divider 
            <svg
              width="46"
              height="2"
              viewBox="0 0 46 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden sm:block self-center"
            >
              <path d="M46 1H0.312241" stroke="white" strokeWidth="2" />
            </svg>

            {/* Mobile Divider 
            <div className="sm:hidden w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

            {/* Right Button 
            <div className="relative w-full sm:w-auto sm:ml-4">
              <svg
                className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-44"
                width="531"
                height="2"
                viewBox="0 0 531 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1H531"
                  stroke="url(#paint0_linear_16_2684)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16_2684"
                    x1="0"
                    y1="1.5"
                    x2="531"
                    y2="1.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#030014" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  borderRadius: "0.625rem",
                  background:
                    "radial-gradient(231.94% 231.94% at 50% 100%, #8A6CFF 0%, rgba(53, 41, 128, 0.00) 25.24%), linear-gradient(180deg, rgba(243, 238, 255, 0.00) 0%, rgba(243, 238, 255, 0.04) 100%), rgba(147, 130, 255, 0.01)",
                  boxShadow:
                    "0 2px 5px 0 rgba(16, 0, 51, 0.39), 0 8px 8px 0 rgba(16, 0, 51, 0.34), 0 19px 11px 0 rgba(16, 0, 51, 0.20), 0 34px 14px 0 rgba(16, 0, 51, 0.06), 0 53px 15px 0 rgba(16, 0, 51, 0.01), 0 0 12px 0 rgba(255, 255, 255, 0.08) inset, 0 -8px 32px 0 #1E0D49 inset",
                }}
                className="w-full sm:w-auto px-6 py-3 text-white font-semibold text-sm sm:text-base text-center min-w-[140px]"
              >
                REGISTER WITH
                <br />
                DEVFOLIO
              </motion.button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
