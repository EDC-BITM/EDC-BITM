import { motion } from "framer-motion";

const CrossIcon = ({ ...props }) => {
  return (
    <motion.svg
      {...props}
      key="close"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.path
        d="M7 7L21 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.25,
          delay: 0.1,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M21 7L7 21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.25,
          delay: 0.25,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
};

export default CrossIcon;
