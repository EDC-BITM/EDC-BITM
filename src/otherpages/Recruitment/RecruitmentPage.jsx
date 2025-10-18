import { useEffect } from "react";
import { motion } from "framer-motion";

export default function RecruitmentRedirect() {
  useEffect(() => {
    window.location.href = "https://forms.gle/nBEbxg5HRCamcyzi7";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-['Sora']">
      <motion.div
        className="backdrop-blur-md bg-black/30 rounded-lg border border-white/50 p-8 shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            "0px 0px 0px rgba(255, 255, 255, 0)",
            "0px 0px 20px rgba(255, 255, 255, 0.7)",
            "0px 0px 0px rgba(255, 255, 255, 0)",
          ],
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          boxShadow: { repeat: Infinity, duration: 2.5 },
        }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          EDC Recruitment
        </motion.h1>

        <div className="flex items-center justify-center mb-4">
          <div className="flex space-x-3">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="h-3 w-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: dot * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-white/80">
          Redirecting to the recruitment form...
        </p>
      </motion.div>
    </div>
  );
}
