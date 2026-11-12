import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const PERMUTATION = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138,
  236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61,
  156, 180,
];

const PERMUTATION_TABLE = Array.from({ length: 512 }, (_, index) =>
  PERMUTATION[index % 256],
);

function fade(value) {
  return value ** 3 * (value * (value * 6 - 15) + 10);
}

function interpolate(amount, start, end) {
  return start + amount * (end - start);
}

function gradient(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function simplex3(x, y, z) {
  const cellX = Math.floor(x) & 255;
  const cellY = Math.floor(y) & 255;
  const cellZ = Math.floor(z) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);

  const u = fade(x);
  const v = fade(y);
  const w = fade(z);
  const a = PERMUTATION_TABLE[cellX] + cellY;
  const aa = PERMUTATION_TABLE[a] + cellZ;
  const ab = PERMUTATION_TABLE[a + 1] + cellZ;
  const b = PERMUTATION_TABLE[cellX + 1] + cellY;
  const ba = PERMUTATION_TABLE[b] + cellZ;
  const bb = PERMUTATION_TABLE[b + 1] + cellZ;

  return interpolate(
    w,
    interpolate(
      v,
      interpolate(
        u,
        gradient(PERMUTATION_TABLE[aa], x, y, z),
        gradient(PERMUTATION_TABLE[ba], x - 1, y, z),
      ),
      interpolate(
        u,
        gradient(PERMUTATION_TABLE[ab], x, y - 1, z),
        gradient(PERMUTATION_TABLE[bb], x - 1, y - 1, z),
      ),
    ),
    interpolate(
      v,
      interpolate(
        u,
        gradient(PERMUTATION_TABLE[aa + 1], x, y, z - 1),
        gradient(PERMUTATION_TABLE[ba + 1], x - 1, y, z - 1),
      ),
      interpolate(
        u,
        gradient(PERMUTATION_TABLE[ab + 1], x, y - 1, z - 1),
        gradient(PERMUTATION_TABLE[bb + 1], x - 1, y - 1, z - 1),
      ),
    ),
  );
}

const DEFAULT_PARTICLE_SIZE = { min: 0.5, max: 2 };

export function FluidParticlesBackground({
  particleCount = 600,
  noiseIntensity = 0.003,
  particleSize = DEFAULT_PARTICLE_SIZE,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const particles = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (particles.length === 0) {
        for (let index = 0; index < particleCount; index += 1) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size:
              Math.random() * (particleSize.max - particleSize.min) +
              particleSize.min,
            life: Math.random() * 100,
            maxLife: 100 + Math.random() * 50,
          });
        }
      } else {
        for (const particle of particles) {
          particle.x = Math.min(particle.x, width);
          particle.y = Math.min(particle.y, height);
        }
      }
    };

    const renderFrame = (now) => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.life += 1;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
        }

        const opacity =
          Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.12;
        const noise = simplex3(
          particle.x * noiseIntensity,
          particle.y * noiseIntensity,
          now * 0.0001,
        );
        const angle = noise * Math.PI * 4;
        particle.x += Math.cos(angle) * 2;
        particle.y += Math.sin(angle) * 2;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        context.fillStyle = `rgba(255,255,255,${opacity})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion && !document.hidden) {
        animationFrame = requestAnimationFrame(renderFrame);
      }
    };

    const handleVisibilityChange = () => {
      cancelAnimationFrame(animationFrame);
      if (document.hidden) return;
      animationFrame = requestAnimationFrame(renderFrame);
    };

    resizeCanvas();
    renderFrame(performance.now());
    if (!reducedMotion && !document.hidden) {
      animationFrame = requestAnimationFrame(renderFrame);
    }
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [noiseIntensity, particleCount, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}

FluidParticlesBackground.propTypes = {
  particleCount: PropTypes.number,
  noiseIntensity: PropTypes.number,
  particleSize: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }),
};
