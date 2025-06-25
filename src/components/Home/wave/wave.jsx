import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const paths = [
  "M 0,400 L 0,150 C 92.7,128.3 185.4,106.6 278,94 C 370.6,81.4 463.0,78.0 553,90 C 643.0,102.0 730.4,129.5 832,150 C 933.6,170.5 1049.3,184.2 1153,183 C 1256.7,181.8 1348.3,165.9 1440,150 L 1440,400 L 0,400 Z",
  "M 0,400 L 0,150 C 84.5,146.2 169.0,142.3 275,142 C 380.9,141.7 508.3,144.9 608,149 C 707.7,153.1 779.7,158.2 856,160 C 932.3,161.8 1013.0,160.2 1111,158 C 1209.1,155.8 1324.5,152.9 1440,150 L 1440,400 L 0,400 Z",
  "M 0,400 L 0,150 C 73.8,118.1 147.5,86.2 251,111 C 354.5,135.8 487.7,217.3 594,223 C 700.3,228.7 779.5,158.7 868,124 C 956.5,89.3 1054.1,89.8 1151,100 C 1247.9,110.2 1343.9,130.1 1440,150 L 1440,400 L 0,400 Z",
  "M 0,400 L 0,150 C 113.9,188.0 227.7,226.0 337,213 C 446.3,200.0 551.0,136.1 629,117 C 707.0,97.9 758.3,123.5 856,119 C 953.7,114.5 1097.9,79.9 1203,80 C 1308.1,80.1 1374.0,115.1 1440,150 L 1440,400 L 0,400 Z",
];

const gradientId = "wave-gradient";

export default function Wave() {
  const controls = useAnimation();

  useEffect(() => {
    let i = 0;
    let isMounted = true;
    const animate = async () => {
      while (isMounted) {
        await controls.start({
          d: paths[i % paths.length],
          transition: {
            duration: 2.5,
            spring: { damping: 50, stiffness: 100 },
          },
        });
        i++;
      }
    };
    animate();
    return () => {
      isMounted = false;
    };
  }, [controls]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 390"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="73%" y1="5%" x2="27%" y2="95%">
          <stop offset="5%" stopColor="#ffff00" />
          <stop offset="95%" stopColor="#00d084" />
        </linearGradient>
      </defs>
      <motion.path
        initial={{ d: paths[0] }}
        animate={controls}
        fill={`url(#${gradientId})`}
        stroke="none"
        style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.08))" }}
      />
    </svg>
  );
}
