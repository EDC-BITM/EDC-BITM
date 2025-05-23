import { useState } from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { motion } from "framer-motion";
import img1 from "../Hero/Idea.png";
import img2 from "../Hero/Event.png";
import img3 from "../Hero/People.png";
import img4 from "../Hero/Feet.png";
import stats1 from "/stats1.jpeg";
import stats2 from "/stats2.jpeg";

function Hero() {
  const [counterOn, setCounterOn] = useState(false);

  // Stats data array
  const statsData = [
    {
      img: img1,
      end: 30,
      label: "Startups",
    },
    {
      img: img2,
      end: 100,
      label: "Events",
    },
    {
      img: img3,
      end: 80,
      label: "Members",
    },
    {
      img: img4,
      end: 10000,
      label: "Footfalls",
    },
  ];

  // Card component for stats
  const StatCard = ({ img, end, label }) => (
    <div className="w-24 flex flex-col items-center text-xl font-semibold">
      <div>
        <img src={img} alt={label} />
      </div>
      <h1>
        {counterOn && <CountUp start={0} end={end} duration={2} delay={0.25} />}
        +
      </h1>
      <h5 className="">{label}</h5>
    </div>
  );

  StatCard.propTypes = {
    img: PropTypes.string.isRequired,
    end: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <div data-aos="fade-up">
      <div id="our_stats" className="sm:pt-8 pt-32 mx-4">
        <div className="glass-morphic lg:m-20 p-4 lg:p-12 shadow-2xl rounded-2xl">
          <div className="flex md:flex-row flex-col">
            <div>
              <div className="w-full hero-2">
                <div className="flex flex-column justify-start items-center">
                  <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                  <h1 className="text-[25px] ml-[-30px] font-bold">
                    EDC, BIT Mesra
                  </h1>
                </div>
                <div className="mt-6 mb-6">
                  <h1 className="text-[35px] font-bold">Our Stats</h1>
                </div>
                <h3 className="text-start text-base mb-4 mr-16">
                  With a team of dedicated experts and passionate empowering
                  entrepreneurs, we bring a wealth of experience and knowledge
                  to every proposal. Our expertise helps to enhance ones
                  fostered growth and supports each entrepreneurial journey.
                </h3>
              </div>
              <ScrollTrigger
                onEnter={() => setCounterOn(true)}
                onExit={() => setCounterOn(false)}
              >
                <div className="w-full h-1/2 flex mt-2 mb-10 flex-col gap-8">
                  <div className="flex items-center md:justify-start sm:justify-center pt-5 justify-evenly sm:pl-20 md:gap-40 hero-3">
                    {statsData.slice(0, 2).map((stat) => (
                      <StatCard key={stat.label} {...stat} />
                    ))}
                  </div>
                  <div className="flex md:gap-40 hero-3 items-center md:justify-start sm:justify-center justify-evenly sm:pl-20 text-xl font-semibold">
                    {statsData.slice(2, 4).map((stat) => (
                      <StatCard key={stat.label} {...stat} />
                    ))}
                  </div>
                </div>
              </ScrollTrigger>
            </div>

            {/* Stats Images */}
            <div className="w-full flex flex-col gap-6">
              <div className="overflow-hidden w-full h-72 rounded-xl shadow-2xl">
                <motion.img
                  className="w-full h-72 rounded-xl"
                  src={stats1}
                  alt="stats_image_1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="overflow-hidden w-full h-72 rounded-xl shadow-2xl">
                <motion.img
                  className="w-full h-72 rounded-xl"
                  src={stats2}
                  alt="stats_image_2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
