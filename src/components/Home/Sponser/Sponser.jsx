import { useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import FadeUpAnimation from "@animations/FadeUp.jsx";
import CldImageData from "@/data/CldImage.json";

export default function Sponser() {
  const sponsors = CldImageData.Home.sponsors;
  const repeated = [...sponsors, ...sponsors];

  {/*the logos are now displayed in a continuous loop twice , earlier it was using half the width as the loop distance -- fixed
    The fix measures the actual position where the repeated set begins, then loops at that exact point. 
    It also moves the animation position with Framer Motion instead of updating React state (removed use state for same) on every animation frame,
     reducing unnecessary rerenders(was making unnecessary updates) */}

  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const speed = 1.0;
  const contentWidth = useRef(0);

  useEffect(() => {
    function updateWidth() {
      const container = containerRef.current;
      const firstDuplicate = container?.children[sponsors.length];
      if (container && firstDuplicate) {
        const containerLeft = container.getBoundingClientRect().left;
        contentWidth.current =
          firstDuplicate.getBoundingClientRect().left - containerLeft;
      }
    }
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [sponsors.length]);

  useAnimationFrame(() => {
    const width = contentWidth.current;
    if (width <= 0) return;

    const next = x.get() - speed;
    x.set(next <= -width ? next + width : next);
  });

  return (
    <FadeUpAnimation>
      <div className="mt-12 overflow-hidden">
        <h2 className="font-bold ml-4 sm:ml-8 md:ml-24 spon1 text-[24px] sm:text-[25px]">
          <span className="bg-[#FED853] pt-2 pb-2 pl-3">Sp</span>onsorship
        </h2>
        <h2 className="text-xl sm:text-2xl py-2 font-bold ml-4 sm:ml-8 md:ml-24 mt-3 sm:mt-5 spon1">
          Our Past Sponsors
        </h2>

        <div className="relative w-full my-6 sm:my-0 overflow-hidden mt-6 sm:mt-10">
          <motion.div
            ref={containerRef}
            className="flex whitespace-nowrap gap-6 sm:gap-12"
            style={{ x }}
          >
            {repeated.map((s, i) => (
              <div
                key={i}
                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 flex justify-center items-center shrink-0"
              >
                <img
                  src={`https://res.cloudinary.com/dmjoxb8pe/image/upload/w_300,f_webp,q_auto/${s.publicId}.webp`}
                  alt={`sponsor ${i + 1}`}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </FadeUpAnimation>
  );
}
