import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const HoverTextTranslateEffect = ({ firstLine, secondLine, className }) => {
  // These variants define the initial and hover states for the text
  // The `show` state is the initial state, and the `hover` state is the state when the text is hovered over
  const lineContainerVariants = {
    initial: {},
    animate: {},
    hover: {},
  };

  const lineOutVariants = {
    initial: { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    hover: { y: -40, opacity: 0 },
  };

  const lineInVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 40, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  const transitionSettings = { duration: 0.25, ease: "easeInOut" };
  return (
    <h1
      className={twMerge(
        "text-center tracking-tighter [word-spacing:0.09em] text-4xl md:text-5xl lg:text-6xl uppercase text-white font-bold ",
        className
      )}
    >
      {/* Top Line */}
      <motion.div
        id="first-line"
        className="overflow-hidden cursor-default relative"
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={lineContainerVariants}
      >
        <motion.div
          key="first-line-out"
          className="absolute inset-0"
          variants={lineOutVariants}
          transition={transitionSettings}
        >
          {firstLine}
        </motion.div>
        <motion.div variants={lineInVariants} transition={transitionSettings}>
          {firstLine}
        </motion.div>
      </motion.div>

      {/* Bottom Line */}
      <motion.div
        key="second-line"
        className="overflow-hidden cursor-default relative"
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={lineContainerVariants}
      >
        <motion.div
          key="second-line-out"
          className="absolute inset-0"
          variants={lineOutVariants}
          transition={transitionSettings}
        >
          {secondLine}
        </motion.div>
        <motion.div variants={lineInVariants} transition={transitionSettings}>
          {secondLine}
        </motion.div>
      </motion.div>
    </h1>
  );
};
HoverTextTranslateEffect.propTypes = {
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  className: PropTypes.string,
};

export default HoverTextTranslateEffect;
