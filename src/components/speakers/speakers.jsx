import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img_1 from "../speakers/karan.png";
import img_2 from "../speakers/amit.png";
import img_3 from "../speakers/aman.png";
import img_4 from "../speakers/ravi.png";
import img_6 from "../speakers/Rishabh.png";
import img_7 from "../speakers/vijendra.png";
import FadeUpAnimation from "../FadeUp";

const speakersData = [
  {
    img: img_1,
    alt: "Karan",
    name: "Karan Bajaj",
    desc: "Founder - WhiteHat Jr",
  },
  {
    img: img_2,
    alt: "Amit",
    name: "Amit Choudhary",
    desc: "Founder - Lenskart",
  },
  {
    img: img_3,
    alt: "Aman",
    name: "Aman Dhattarwal",
    desc: "Founder - Apni Kaksha",
  },
  {
    img: img_4,
    alt: "Ravi",
    name: "Ravi K Ranjan",
    desc: "Ex Shark Tank",
  },
  {
    img: img_6,
    alt: "Rishabh",
    name: "Rishabh Jain",
    desc: "Labour Law Advisor",
  },
  {
    img: img_7,
    alt: "Vijendra Chauhan",
    name: "Dr. Vijendra Chauhan",
    desc: "Public Speaker",
  },
];

// duplicate cards for seamless scroll
const duplicatedSpeakers = [...speakersData, ...speakersData];

function Speakers() {
  return (
    <>
      <FadeUpAnimation>
        <div className="glass-morphic lg:m-20 p-4 lg:p-12 shadow-2xl rounded-2xl">
          <div className="p-4">
            <div className="flex flex-row justify-start items-center">
              <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
              <h1 className="text-[25px] ml-[-25px] font-bold">Speakers</h1>
            </div>
            <div className="mt-6 mb-12">
              <h1 className="text-[35px] font-bold">Some Past Speakers</h1>
            </div>
          </div>

          <div className="flex relative overflow-hidden min-h-[400px] sm:h-auto">
            <motion.div
              className="flex space-x-6"
              style={{ whiteSpace: "nowrap" }}
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration: 15,
              }}
            >
              {duplicatedSpeakers.map((speaker, idx) => (
                <div
                  key={`speaker-${idx}`}
                  className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end"
                >
                  <img loading="lazy" src={speaker.img} alt={speaker.alt} />
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {speaker.name}
                  </h3>
                  <p className="text-center">{speaker.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Link spy={true} smooth={true} to="/Speakers">
              <button className="transition ease-in-out hover:scale-110 p-4 rounded-xl bg-[#FED853] font-bold mt-[-50px]">
                Know More
              </button>
            </Link>
          </div>
        </div>
      </FadeUpAnimation>
    </>
  );
}

export default Speakers;
