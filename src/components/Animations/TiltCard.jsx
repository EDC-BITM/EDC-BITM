import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const TILT_SPRING = { stiffness: 240, damping: 24, mass: 0.6 };
const LIFT_SPRING = { stiffness: 320, damping: 26 };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function TiltCard({
  children,
  width = 300,
  height = 375,
  radius = 24,
  tiltMax = 12,
  glare = true,
  glareOpacity = 0.22,
  hoverScale = 1.03,
  perspective = 1100,
  shadow = true,
  className = "",
  onClick,
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);

  const tiltX = useSpring(0, TILT_SPRING);
  const tiltY = useSpring(0, TILT_SPRING);
  const lift = useSpring(1, LIFT_SPRING);
  const sheen = useSpring(0, LIFT_SPRING);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const transform = useMotionTemplate`perspective(${perspective}px) scale(${lift}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  const gxPct = useMotionTemplate`${gx}%`;
  const gyPct = useMotionTemplate`${gy}%`;

  const onPointerMove = (event) => {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    tiltX.set((0.5 - py) * 2 * tiltMax);
    tiltY.set((px - 0.5) * 2 * tiltMax);
    gx.set(px * 100);
    gy.set(py * 100);
    sheen.set(1);
  };

  const onPointerEnter = (event) => {
    if (!reduce && event.pointerType !== "touch") lift.set(hoverScale);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    lift.set(1);
    sheen.set(0);
  };

  return (
    <div
      ref={rootRef}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`relative inline-block select-none ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {shadow ? (
        <span
          className="absolute inset-[10%] -bottom-2 -z-10 pointer-events-none bg-black/35 blur-xl transition-opacity duration-300"
          style={{ borderRadius: `${radius}px` }}
        />
      ) : null}

      <motion.div
        className="relative w-full h-full overflow-hidden shadow-xl"
        style={{
          borderRadius: `${radius}px`,
          transform: reduce ? undefined : transform,
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {glare ? (
          <motion.span
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{
              opacity: sheen,
              background: useMotionTemplate`radial-gradient(circle farthest-side at ${gxPct} ${gyPct}, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, ${
                glareOpacity * 0.7
              }) 15%, rgba(255, 255, 255, 0) 100%)`,
            }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}
