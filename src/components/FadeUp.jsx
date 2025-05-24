import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FadeUpAnimation = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
FadeUpAnimation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeUpAnimation;
