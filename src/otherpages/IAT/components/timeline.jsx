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
    description:
      "Led digital transformation initiatives and expanded community outreach programs.",
    achievements:
      "Digital transformation, Community expansion, Innovation leadership",
  },
  {
    name: "Pranit",
    tenure: "2023-2024",
    image: pranit.src,
    description:
      "Focused on innovation and technology advancement within the organization.",
    achievements: "Technology advancement, Innovation focus, Strategic growth",
  },
  {
    name: "Saumya Agarwal",
    tenure: "2022-2023",
    image: saumya.src,
    description:
      "Strengthened partnerships and implemented sustainable development practices.",
    achievements:
      "Partnership building, Sustainable practices, Organizational growth",
  },
  {
    name: "Sarwadi Satank",
    tenure: "2021-2022",
    image: sarwadi.src,
    description:
      "Navigated challenges during pandemic while maintaining organizational growth.",
    achievements: "Pandemic resilience, Growth maintenance, Crisis management",
  },
  {
    name: "Utkarsh Mishra",
    tenure: "2020-2021",
    image: utkarsh.src,
    description:
      "Established foundational policies and expanded membership significantly.",
    achievements:
      "Policy establishment, Membership expansion, Foundation building",
  },
  {
    name: "Rahul Thakur",
    tenure: "2019-2020",
    image: rahul.src,
    description:
      "Pioneer leader who set the vision and direction for the organization.",
    achievements: "Vision setting, Direction establishment, Pioneer leadership",
  },
];

function IAT_Timeline() {
  return (
    <>
      <HeadingTimeline />
      <div className="flex justify-center">
        <div className="flex flex-col max-w-7xl w-full px-4 py-8 relative">
          {/* SVG vertical timeline line */}
          <motion.svg
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 -translate-x-1/2 z-0"
            width="2"
            height="100%"
            viewBox={`0 0 2 ${presidents.length * 400}`}
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
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="2"
              height={presidents.length * 400}
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
              className="flex relative z-10 items-center mb-32"
              style={{ minHeight: 400 }}
            >
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
                className="bg-gradient-to-r from-blue-500 to-orange-500 border-4 border-black shadow-lg rounded-full z-20 absolute left-1/2 -translate-x-1/2"
                style={{
                  width: 20,
                  height: 20,
                }}
              />

              {/* Content sections */}
              <div className="flex w-full gap-16">
                {/* Left section */}
                <div
                  className={`flex-1 ${idx % 2 === 0 ? "order-1" : "order-2"}`}
                >
                  {idx % 2 === 0 ? (
                    <HeadingSection
                      name={president.name}
                      tenure={president.tenure}
                      achievements={president.achievements}
                      index={idx}
                    />
                  ) : (
                    <ContentSection
                      image={president.image}
                      description={president.description}
                      name={president.name}
                      index={idx}
                    />
                  )}
                </div>

                {/* Right section */}
                <div
                  className={`flex-1 ${idx % 2 === 0 ? "order-2" : "order-1"}`}
                >
                  {idx % 2 === 0 ? (
                    <ContentSection
                      image={president.image}
                      description={president.description}
                      name={president.name}
                      index={idx}
                    />
                  ) : (
                    <HeadingSection
                      name={president.name}
                      tenure={president.tenure}
                      achievements={president.achievements}
                      index={idx}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

const HeadingSection = ({ name, tenure, achievements, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col justify-center h-full p-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
      >
        {name}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        className="space-y-6"
      >
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Tenure Period
          </h3>
          <p className="text-gray-300 text-lg">{tenure}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">
            Key Achievements
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {achievements}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContentSection = ({ image, description, name, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center h-full p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="mb-8"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-48 h-48 object-cover rounded-full border-4 border-gradient-to-r from-blue-500 to-orange-500 shadow-2xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        className="bg-gray-900 rounded-xl p-6 border border-gray-800 max-w-md"
      >
        <h3 className="text-xl font-semibold text-blue-400 mb-3">
          Leadership Legacy
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};

HeadingSection.propTypes = {
  name: PropTypes.string.isRequired,
  tenure: PropTypes.string.isRequired,
  achievements: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

ContentSection.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const HeadingTimeline = () => {
  return (
    <div className="p-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-bold mb-6"
      >
        <span className="text-blue-500">The</span>{" "}
        <span className="text-orange-500">Timeline</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-gray-400 max-w-3xl mx-auto"
      >
        Journey through the leadership that shaped our organization's growth and
        success
      </motion.p>
    </div>
  );
};

export default IAT_Timeline;
