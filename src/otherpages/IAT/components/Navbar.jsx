/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IATBulb from "../assets/IATBulb.svg?react";
import { Link } from "react-scroll";

const IATLogo = ({ className }) => <IATBulb className={className} />;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false); // scrolling neche
      } else {
        setShow(true); // scrolling upar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", label: "" },
    { name: "Schedule", label: "timeline" },
    { name: "Speakers", label: "speakers" },
    { name: "Gallery", label: "gallery" },
    { name: "Problem Statements", label:"problems"}
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const handleScrollTo = (item) => {
    setActiveItem(item.name);

    if (item.name === "Home" || item.label === "") {
      // Scroll to top for Home
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  console.log(isMenuOpen);
  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-4"
    >
      <div className="relative w-full max-w-7xl mx-auto bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl px-4 sm:px-6 lg:px-8 shadow-2xl shadow-black/20">
        {/* Top-left border accent */}
        <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-l-2 border-t-2 border-gray-400/60 rounded-tl-2xl opacity-50 transition-all duration-300"></div>
        {/* Bottom-right border accent */}
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-r-2 border-b-2 border-gray-400/60 rounded-br-2xl opacity-50 transition-all duration-300"></div>

        <div className="flex items-center justify-between h-16 lg:h-20 w-full">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleScrollTo({ name: "Home", label: "" })}
          >
            <IATLogo className="w-8 h-8 lg:w-10 lg:h-10" />
            <span className="text-white font-bold text-lg lg:text-xl tracking-wide">
              Innovate-A-Thon
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.name === "Home" || item.label === "" ? (
                  <motion.button
                    onClick={() => handleScrollTo(item)}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {activeItem === item.name && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ) : (
                  <Link
                    to={item.label}
                    spy={true}
                    smooth={true}
                    duration={800}
                    offset={-100}
                    className="block"
                    onClick={() => setActiveItem(item.name)}
                  >
                    <motion.div
                      className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-white cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {activeItem === item.name && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Register Button (Desktop) */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(101, 94, 253, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 cursor-pointer bg-[#655EFD] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#655EFD]/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onClick={() =>
                window.open(
                  "https://unstop.com/p/innovate-a-thon-30-bit-mesra-ranchi-1529762",
                  "_blank"
                )
              }
            >
              Register
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden z-10">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-full hover:bg-white/10 focus:outline-none focus:bg-white/10"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden pb-4"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.name === "Home" || item.label === "" ? (
                      <motion.button
                        onClick={() => {
                          handleScrollTo(item);
                          setIsMenuOpen(false);
                        }}
                        variants={menuItemVariants}
                        className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                          activeItem === item.name
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </motion.button>
                    ) : (
                      <Link
                        to={item.label}
                        spy={true}
                        smooth={true}
                        duration={800}
                        offset={-100}
                        className="block"
                        onClick={() => {
                          setActiveItem(item.name);
                          setIsMenuOpen(false);
                        }}
                      >
                        <motion.div
                          variants={menuItemVariants}
                          className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                            activeItem === item.name
                              ? "text-white bg-white/10"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <motion.button
                    variants={menuItemVariants}
                    className="w-full px-4 py-3 bg-[#655EFD] hover:bg-[#5851e0] text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Register
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
