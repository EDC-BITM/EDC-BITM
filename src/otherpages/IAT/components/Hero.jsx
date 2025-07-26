import { motion } from "framer-motion";
import icon from "../assets/Frame.svg";
import iatLogo from "../assets/iatlogo.png?w=1480&q=75&format=webp";

const Hero = () => {
  return (
    <div className="flex justify-center mt-20 sm:mt-26 px-4">
      <div className="flex w-full max-w-[90%] sm:max-w-[70%] flex-col items-center justify-center gap-4 mb-8 text-white">
        {/* Announcement Bar */}
        <div className="flex px-3 lg:translate-y-10 rounded-2xl py-1.5 bg-gradient-to-r from-[#E59CFF3D] via-[#BA9CFF3D] to-[#9CB2FF3D] items-center justify-center gap-2 text-white text-xs sm:text-sm">
          <img src={icon} className="w-4 h-4 sm:w-5 sm:h-5" alt="Event Icon" />
          <span>New: Check our Schedule</span>
        </div>

        {/* Heading and Logo */}
        <div className="text-center flex flex-col items-center font-semibold leading-tight sm:leading-[10rem] text-white">
          <h1 className="text-nowrap text-5xl sm:text-[5rem] md:text-[8rem] lg:text-[10.75rem] leading-[1.2]">
            Welcome to
          </h1>
          <div className="flex h-28 items-center -translate-y-4 justify-center w-full">
            <img
              draggable="false"
              loading="lazy"
              width="1480"
              height="auto"
              src={iatLogo}
              className="w-[90%] sm:w-[80%] md:w-[60%] h-auto"
              alt="Innovate-A-Thon Logo"
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-center sm:mt-8 text-white text-sm sm:text-[1.125rem] leading-relaxed sm:leading-[1.85625rem] max-w-[90%] sm:max-w-[52.75rem]">
          Think beyond code and business plans. From ideation to execution,
          you’ll be immersed in a space where entrepreneurship meets futuristic
          tech, turning concepts into real-world impact.
        </p>

        {/* Registration Section */}
        <div className="relative w-full min-h-[10rem] flex flex-col items-center justify-center bg-transparent">
          {/* Dotted Line Background */}
          <div className="absolute w-full h-0.5 top-1/2 -translate-y-1/2 bg-dotted-line-texture"></div>

          {/* Buttons and SVGs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            {/* Left Button */}
            <div className="relative mb-4 sm:mb-0 sm:mr-4">
              <svg
                className="hidden sm:block absolute top-1/2 -translate-y-1/2 right-40"
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
                className="px-4 py-2 text-white font-semibold text-sm sm:text-base text-center"
              >
                REGISTER WITH
                <br />
                UNSTOP
              </motion.button>
            </div>

            {/* Middle Divider */}
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

            {/* Right Button */}
            <div className="relative sm:ml-4">
              <svg
                className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-40"
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
                className="px-4 py-2 text-white font-semibold text-sm sm:text-base text-center"
              >
                REGISTER WITH
                <br />
                DEVFOLIO
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
