import PropTypes from "prop-types";
import { motion, useScroll, useTransform } from "framer-motion";

import img1 from "../assets/timeline/1.png?w=300&format=webp&quality=90&as=meta";
import img2 from "../assets/timeline/2.png?w=300&format=webp&quality=90&as=meta";
import img3 from "../assets/timeline/3.png?w=300&format=webp&quality=90&as=meta";
import img4 from "../assets/timeline/4.png?w=300&format=webp&quality=90&as=meta";
import img5 from "../assets/timeline/5.png?w=300&format=webp&quality=90&as=meta";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

const timelineItems = [
  {
    title: "July 28, Registrations Open",
    image: img1.src,
    description:
      "It’s time to step up. Dive in, dream big, and register for the ultimate tech showdown. Your innovation journey begins here.",
  },
  {
    title: "15 August, Registration Ends & Evaluation Starts",
    image: img2.src,
    description:
      "Doors close today! It's your last chance to join us. As registrations conclude, our team prepares to evaluate the most innovative minds.",
  },
  {
    title: "19 August, Round 1 Results Announced",
    image: img3.src,
    description:
      "Did your idea make the cut? The wait is over. It’s time to see if you're among the changemakers moving forward",
  },
  {
    title: "August 29 (Evening), Inauguration & Speaker Session",
    image: img4.src,
    description:
      "We begin with inspiration. Hear from visionaries who once stood where you are and dared to go further.",
  },
  {
    title: "August 29 (Night), Hackathon Begins",
    image: img5.src,
    description:
      "Gear up, team up, and light up your screens. The hacking marathon kicks off tonight. Build without boundaries!",
  },
  {
    title: "August 31 (Morning), Hackathon Concludes",
    description:
      "Time’s up, innovators! Submit your builds, pitch your brilliance, and get ready for the spotlight.",
  },
];

function IAT_Timeline() {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div id="timeline" className="mb-8">
      <HeadingTimeline />
      <div className="flex justify-center px-4">
        <div
          ref={timelineRef}
          className="flex flex-col max-w-7xl w-full pt-8 relative"
        >
          {/* Vertical timeline line - Hidden on mobile */}
          <motion.span
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 to-orange-400  origin-top rounded-full z-0"
            style={{ height: "100%", scaleY }}
          />

          {/* Mobile timeline line - changed from SVG to span */}
          <span
            className="md:hidden absolute left-[.95rem] top-0 z-0"
            style={{
              width: "2px",
              height: `${timelineItems.length * 560}px`,
              background:
                "linear-gradient(180deg, #3b82f6 0%, #f97316 50%, transparent 100%)",
              borderRadius: "1px",
            }}
          />

          {timelineItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex relative z-10 items-start mb-16 md:mb-32 "
            >
              {/* Timeline dot - Desktop */}
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
                className="hidden md:block bg-gradient-to-r from-blue-500 to-orange-500 border-4 border-black shadow-lg rounded-full z-20 absolute left-1/2 -translate-x-1/2"
                style={{
                  width: 20,
                  height: 20,
                }}
              />

              {/* Timeline dot - Mobile */}
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
                className="md:hidden bg-gradient-to-r from-blue-500 to-orange-500 border-2 border-black shadow-lg rounded-full z-20 absolute left-4 -translate-x-1/2"
                style={{
                  width: 16,
                  height: 16,
                }}
              />

              {/* Content sections */}
              <div className="flex w-full gap-0">
                {/* Mobile Layout - Single Column */}
                <div className="md:hidden w-full pl-8">
                  <div className="space-y-4">
                    <HeadingSection title={item.title} index={idx} />
                    <ContentSection
                      image={item.image}
                      description={item.description}
                      index={idx}
                    />
                  </div>
                </div>

                {/* Desktop Layout - Two Columns */}
                <div className="hidden md:flex w-full gap-0">
                  {/* Left section */}
                  <div className="flex-1">
                    {idx % 2 === 0 ? (
                      <HeadingSection
                        className={"md:text-right"}
                        title={item.title}
                        index={idx}
                      />
                    ) : (
                      <ContentSection
                        image={item.image}
                        description={item.description}
                        index={idx}
                      />
                    )}
                  </div>

                  {/* Right section */}
                  <div className="flex-1">
                    {idx % 2 === 0 ? (
                      <ContentSection
                        image={item.image}
                        description={item.description}
                        index={idx}
                      />
                    ) : (
                      <HeadingSection
                        className={"md:text-left"}
                        title={item.title}
                        index={idx}
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HeadingSection = ({ title, index, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col justify-start h-full p-2 md:p-8 py-2"
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        className={twMerge(
          "text-lg md:text-3xl font-semibold text-left  sm:no-underline underline",
          className
        )}
      >
        {title}
      </motion.h3>
    </motion.div>
  );
};

const ContentSection = ({ image, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center justify-start p-2 translate-y-6 md:-translate-y-0 md:p-8 py-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.3 }}
        className=" w-full max-w-md"
      >
        <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
          {description}
        </p>
        {image && (
          <img
            src={image}
            alt="event visual"
            className="rounded-3xl w-full object-cover"
          />
        )}
      </motion.div>
    </motion.div>
  );
};

HeadingSection.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

ContentSection.propTypes = {
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const HeadingTimeline = () => {
  return (
    <div className="p-4 md:p-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal leading-tight sm:leading-[5.56rem] tracking-tight sm:tracking-[-0.0556rem] bg-clip-text text-transparent mb-4 sm:mb-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #6366F1 0%, #8B5CF6 25%, #EC4899 55%, #F59E0B 80%, #FDE68A 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        The Timeline
      </motion.h1>
    </div>
  );
};

export default IAT_Timeline;
