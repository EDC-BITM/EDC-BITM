import "../Body/body.css";
import blob from "/blobs.png";
import blobR from "/blobR.png";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

function Body() {
  // These variants define the initial and hover states for the text
  // The `show` state is the initial state, and the `hover` state is the state when the text is hovered over
  const upvarient = {
    show: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -40,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  const downvarient = {
    show: {
      y: 40,
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  return (
    <div className="h-screen p-0 w-full m-0">
      <div className="sm:h-full h-screen w-screen bg-no-repeat sm:w-full p-0 m-0 box-border bg-center flex flex-col b-body justify-center items-center bg-cover ">
        <div className="heading w-full flex justify-center items-center">
          <h1 className="text-center tracking-tighter [word-spacing:0.09em] text-3xl md:text-5xl uppercase text-white">
            <motion.div
              initial="show"
              whileHover="hover"
              className="overflow-hidden cursor-default lg:h-14 relative"
            >
              <motion.div className="absolute inset-0" variants={upvarient}>
                Igniting the innovation
              </motion.div>
              <motion.div className="" variants={downvarient}>
                Igniting the innovation
              </motion.div>
            </motion.div>
            <motion.div
              initial="show"
              whileHover="hover"
              className="overflow-hidden h-24 cursor-default lg:h-14 relative"
            >
              <motion.div className="absolute inset-0" variants={upvarient}>
                within upcoming ground breakers.
              </motion.div>
              <motion.div variants={downvarient}>
                within upcoming ground breakers.
              </motion.div>
            </motion.div>
          </h1>
        </div>
        <div className="group duration-150 ease-in-out cursor-pointer hover:bg-[whitesmoke]  rounded-[10px] text-2xl border border-white  hover:scale-110 backdrop-blur-sm text-black h-auto">
          <div className="flex justify-center items-center">
            <button className="group-hover:text-black px-8 py-1.5 text-white transition ease-in-out">
              <Link
                to="our_stats"
                smooth={true}
                duration={500}
                offset={-70}
                className="outline-button"
              >
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
      <img src={blob} className="blob1" />
      <img src={blob} className="blob2" />
      <img src={blobR} className="blob3" />
      <img src={blob} className="blob4" />
      <img src={blobR} className="blob5" />
      <img src={blobR} className="blob6" />
    </div>
  );
}

export default Body;
