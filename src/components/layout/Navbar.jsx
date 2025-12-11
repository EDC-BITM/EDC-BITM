import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import MenuIcon from "../Animations/Icons/Menu";
import CrossIcon from "../Animations/Icons/Cross";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/Events", label: "Events" },
  { href: "/Speakers", label: "Speakers" },
  { href: "/announcement", label: "Announcement" },
  { href: "/Team", label: "Team" },
  { href: "/Startups", label: "Startups" },
];

const NavBar = () => {
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if current page needs light navbar (for light backgrounds)
  const isLightPage = pathname === "/announcement";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position before locking scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position after unlocking
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      className={`fixed top-0 left-0 z-50 w-full transition-all ${
        scrolled
          ? isLightPage
            ? "bg-gradient-to-b from-white/90 via-white/70 to-white/20 shadow-lg backdrop-blur-lg"
            : "bg-gradient-to-b from-black/90 via-black/70 to-black/20 shadow-lg backdrop-blur-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={EDCLogo.src}
            alt="Logo"
            width={48}
            height={48}
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="drop-shadow-lg"
          />
          <span
            className={`hidden text-sm leading-tight font-semibold sm:block transition-colors duration-300 ${
              isLightPage
                ? "text-gray-900 group-hover:text-yellow-500"
                : "text-white group-hover:text-yellow-400"
            }`}
          >
            Entrepreneurship <br />
            Development Cell
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={`hidden items-center space-x-8 text-base font-semibold md:flex ${
            isLightPage ? "text-gray-900" : "text-white"
          }`}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`relative px-2 py-1 transition-all duration-300
                after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:rounded-b-full after:transition-all after:duration-300 after:content-['']
                ${
                  isLightPage
                    ? `after:bg-yellow-500 hover:text-yellow-600 hover:after:w-full hover:after:shadow-[0_2px_8px_rgba(234,179,8,0.7)]
                       ${
                         pathname === href
                           ? "text-yellow-600 after:w-full after:shadow-[0_2px_8px_rgba(234,179,8,0.5)]"
                           : ""
                       }`
                    : `after:bg-yellow-400 hover:text-yellow-400 hover:after:w-full hover:after:shadow-[0_2px_8px_rgba(250,204,21,0.7)]
                       ${
                         pathname === href
                           ? "text-yellow-400 after:w-full after:shadow-[0_2px_8px_rgba(250,204,21,0.5)]"
                           : ""
                       }`
                }
              `}
              style={{ letterSpacing: "0.02em" }}
            >
              <motion.span whileHover={{ scale: 1.08 }}>{label}</motion.span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div 
          className="hidden md:flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/Submissions"
            className="relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden group"
            style={{
              background: 'rgba(254, 216, 83, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(254, 216, 83, 0.3)',
              color: '#FED853'
            }}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FED853]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            
            {/* Glow effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FED853]/0 via-[#FED853]/10 to-[#FED853]/0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            {/* Button text */}
            <span className="relative flex items-center gap-2">
              Get Pre-Incubated
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </motion.svg>
            </span>
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden rounded-full p-2 transition flex items-center justify-center z-[60] ${
            isLightPage
              ? "text-gray-900 hover:bg-gray-900/10"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isOpen ? <MenuIcon key={"menu"} /> : <CrossIcon key={"close"} />}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div
                className="min-h-full flex flex-col bg-gradient-to-b from-black/90 via-black/70 to-black/50 pt-24 pb-20 px-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flex-1 flex flex-col justify-center items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {navLinks.map(({ href, label }, idx) => (
                    <motion.div
                      key={href}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.1 + idx * 0.1,
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                      }}
                      className="w-full mb-8"
                    >
                      <Link
                        to={href}
                        onClick={() => {
                          setIsOpen(false);
                          window.scrollTo(0, 0);
                        }}
                        className={`relative text-center block w-full text-2xl font-bold py-4 transition-all duration-300
                          ${
                            pathname === href
                              ? "text-yellow-400"
                              : "text-white hover:text-yellow-400"
                          }
                        `}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                            x: 10,
                            transition: { type: "spring", stiffness: 400 },
                          }}
                          className="flex items-center justify-center"
                        >
                          <span>{label}</span>
                          {pathname === href && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute -left-4 w-2 h-2 rounded-full bg-yellow-400"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile CTA Button */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1 + navLinks.length * 0.1,
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                    }}
                    className="w-full mt-8"
                  >
                    <Link
                      to="/Submissions"
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className="relative block w-full text-center py-5 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden group"
                      style={{
                        background: 'rgba(254, 216, 83, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(254, 216, 83, 0.3)',
                        color: '#FED853'
                      }}
                    >
                      {/* Shine effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FED853]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                      
                      {/* Button text */}
                      <span className="relative flex items-center justify-center gap-3">
                        Get Pre-Incubated
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          <path d="M5 12h14"/>
                          <path d="m12 5 7 7-7 7"/>
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto text-center text-white/60 text-sm"
                >
                  © {new Date().getFullYear()} EDC BITM
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;