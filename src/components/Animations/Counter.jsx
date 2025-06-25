import { animate, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";

// This component animates a number from a starting value to an ending value
const AnimatedCounter = ({ from, to, duration, decimals = 0 }) => {
  const countRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const element = countRef.current;
    if (!element) return;

    element.textContent = from.toFixed(decimals);

    const controls = animate(from, to, {
      duration,
      ease: "easeInOut",
      onUpdate: (latest) => {
        element.textContent = Number(latest).toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [from, to, duration, decimals]);

  return <span ref={countRef} />;
};

AnimatedCounter.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  decimals: PropTypes.number,
};

export default AnimatedCounter;
