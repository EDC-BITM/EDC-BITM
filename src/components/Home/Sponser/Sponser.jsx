import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import FadeUpAnimation from "@animations/FadeUp.jsx";
import CldImageData from "@/data/CldImage.json";

export default function Sponser() {
  const sponsors = CldImageData.Home.sponsors;
  const repeated = [...sponsors, ...sponsors];

  const containerRef = useRef(null);
  const [x, setX] = useState(0);
  const speed = 1.0;
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth / 2);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useAnimationFrame(() => {
    setX((prev) => {
      const next = prev - speed;
      return next <= -contentWidth ? 0 : next;
    });
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
