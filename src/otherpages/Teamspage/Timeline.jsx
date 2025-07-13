import PropTypes from "prop-types";
import ujjwal from "@assets/teams/pastPresident/ujjwal.png?w=200&format=webp&quality=50&as=meta";
import pranit from "@assets/teams/pastPresident/Pranit 23-24.jpeg?w=200&format=webp&quality=50&as=meta";
import saumya from "@assets/teams/pastPresident/Saumya Agarwal 22-23.jpeg?w=200&format=webp&quality=50&as=meta";
import sarwadi from "@assets/teams/pastPresident/Sarwadi.jpeg?w=200&format=webp&quality=50&as=meta";
import utkarsh from "@assets/teams/pastPresident/utkarsh mishra 20-21.jpeg?w=200&format=webp&quality=50&as=meta";
import rahul from "@assets/teams/pastPresident/Rahul thakur 19-20.jpeg?w=200&format=webp&quality=50&as=meta";
import { motion } from "framer-motion";

const presidents = [
  {
    name: "Ujjwal Aman",
    tenure: "2024-2025",
    image: ujjwal.src,
  },
  {
    name: "Pranit",
    tenure: "2023-2024",
    image: pranit.src,
  },
  {
    name: "Saumya Agarwal",
    tenure: "2022-2023",
    image: saumya.src,
  },
  {
    name: "Sarwadi Satank",
    tenure: "2021-2022",
    image: sarwadi.src,
  },
  {
    name: "Utkarsh Mishra",
    tenure: "2020-2021",
    image: utkarsh.src,
  },
  {
    name: "Rahul Thakur",
    tenure: "2019-2020",
    image: rahul.src,
  },
];

function Timeline() {
  return (
    <div aria-label="president-timeline">
      <HeadingTimeline />
      <div className="flex justify-center">
        <div className="flex flex-col max-w-3xl w-full px-4 py-8 relative">
          {/* SVG vertical timeline line */}
          <motion.svg
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute left-[12%] sm:left-1/2 top-0 -translate-x-1/2 z-0"
            width="8"
            height="100%"
            viewBox={`0 0 8 ${presidents.length * 160}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="timeline-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#9333ea" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect
              x="3"
              y="0"
              width="2"
              height={presidents.length * 160}
              rx="1"
              fill="url(#timeline-gradient)"
            />
          </motion.svg>
          {presidents.map((president, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`flex relative z-10 ${
                idx % 2 === 0 ? "sm:justify-start justify-end" : "justify-end"
              } mb-8 sm:mb-4`}
              style={{ minHeight: 160 }}
            >
              <TimelineItem
                index={idx}
                key={president.name}
                name={president.name}
                tenure={president.tenure}
                image={president.image}
              />
              {/* Timeline dot */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
                className="absolute left-[5.5%] sm:left-[48.4%] top-[45%] bg-yellow-300 border-4 border-white shadow-md rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  zIndex: 20,
                }}
              ></motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TimelineItem = ({ name, tenure, image, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      aria-label="president-timeline-item"
      role="article"
      key={name}
      initial={{
        opacity: 0,
        x: isEven ? -50 : 50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        damping: 7,
        stiffness: 100,
      }}
      className="relative flex w-32 sm:w-48  flex-col items-center bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-6 min-w-[240px] max-w-xs border border-white/40"
    >
      <motion.div
        aria-label="president-image"
        role="img"
        className="relative mb-5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-32 h-32 object-cover rounded-full border-4 border-yellow-300 shadow-lg"
        />
        <span className="absolute -bottom-1.5 right-1.5 bg-yellow-300 rounded-full w-5 h-5 border-2 border-white shadow-md"></span>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-800 text-center">{name}</h2>
      <div className="flex items-center gap-1.5 mt-1">
        <p className="text-md text-gray-600 text-center">{tenure}</p>
      </div>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "50%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        className={`absolute h-[1.5px] bg-gradient-to-r from-yellow-300/80 via-gray-400/80 to-transparent rounded-full ${
          isEven
            ? "top-1/2 right-full sm:left-full -translate-y-1/2 transform-gpu sm:rotate-180"
            : "top-1/2 right-full -translate-y-1/2"
        }`}
      ></motion.span>
    </motion.div>
  );
};

TimelineItem.propTypes = {
  name: PropTypes.string.isRequired,
  tenure: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const HeadingTimeline = () => {
  return (
    <div className="p-1">
      <h3 className="text-xl font-semibold ml-7 mb-4 mt-8">
        <span className="bg-yellow-300 pt-2 pb-2 pl-4">Ha</span>ll of Fame
      </h3>
      <motion.h2
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold ml-7 mb-4 hidden mt-7"
      >
        Previous Presidents
      </motion.h2>
    </div>
  );
};

export default Timeline;
