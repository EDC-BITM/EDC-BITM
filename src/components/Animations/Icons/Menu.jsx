import { motion } from "framer-motion";

const MenuIcon = ({ ...props }) => {
  return (
    <motion.svg
      {...props}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.path
        d="M5 8H23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      />
      <motion.path
        d="M5 14H23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      />
      <motion.path
        d="M5 20H23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      />
    </motion.svg>
  );
};

export default MenuIcon;
