import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaArrowLeft,
} from "react-icons/fa";
import blobL from "@assets/blobs/blobL.png?w=200&format=webp&quality=50&as=meta";
import blobR from "@assets/blobs/blobR.png?w=200&format=webp&quality=50&as=meta";

const RecruitmentPage = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/edcbitmesra",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/edcbitmesra",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/edcbitmesra",
    },
  ];

  useEffect(() => {
    const launchDate = new Date("2025-11-15T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* ===== Background ===== */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white" />

        {/* Animated circles */}
        <motion.div
          className="absolute top-10 left-10 sm:top-20 sm:left-20 w-40 h-40 sm:w-72 sm:h-72 rounded-full bg-yellow-500/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 10,
            delay: 1,
          }}
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]" />
      </div>

      {/* ===== Main Content ===== */}
      <div className="container z-30 mx-auto px-4 sm:px-6 py-16 sm:py-24  flex flex-col items-center justify-center flex-grow">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl sm:max-w-4xl mx-auto bg-white/60 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-200"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group mb-6">
            <motion.img
              src={EDCLogo.src}
              alt="EDC Logo"
              width={48}
              height={48}
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="drop-shadow-lg"
            />
            <span className="block text-sm leading-tight font-semibold text-gray-700 group-hover:text-yellow-500 transition-colors duration-300">
              Entrepreneurship <br />
              Development Cell
            </span>
          </Link>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight text-gray-900"
          >
            Recruitment{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600">
              Coming Soon
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 max-w-2xl"
          >
            We're looking for passionate innovators and entrepreneurs to join
            our team. Get ready to be part of something extraordinary.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <span className="mb-3 text-xs sm:text-sm text-gray-600">
              Follow us for updates
            </span>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-gray-300 text-gray-600 hover:text-amber-600 hover:border-yellow-400 hover:shadow-md transition-colors"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(251, 191, 36, 0.05)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== Footer ===== */}
      <motion.div
        className="mt-auto pt-6 pb-6 text-center text-xs sm:text-sm text-gray-600 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          to="/"
          className="hover:text-amber-600 group flex items-center justify-center transition-colors"
        >
          <FaArrowLeft className="inline-block mr-1 group-hover:-translate-x-1.5 ease-in-out duration-200" />
          Back to Home
        </Link>
      </motion.div>
      <img
        src={blobL.src}
        alt="Blob 1"
        className="absolute w-64 z-10 left-0 mt-12 md:w-64 md:mt-12 max-md:w-48 max-md:mt-[30px]"
      />
      <img
        src={blobR.src}
        alt="Blob 2"
        className="absolute w-64 z-10 right-0 top-[20rem] md:w-64 max-md:w-48 max-md:top-[2900px]"
      />
    </div>
  );
};

export default RecruitmentPage;
