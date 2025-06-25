import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/Events", label: "Events" },
  { href: "/Speakers", label: "Speakers" },
  { href: "/Team", label: "Team" },
  { href: "/App", label: "App" },
];

const NavBar = () => {
  const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all ${
        scrolled ? "bg-black/70 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={EDCLogo.src} alt="Logo" width={48} height={48} />
          <span className="hidden text-sm leading-tight font-medium text-white sm:block">
            Entrepreneurship <br />
            Development Cell
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 text-base font-medium text-white md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`transition-all duration-300 after:block after:h-0.5 after:w-0 after:rounded-b-full after:bg-yellow-400 after:transition-all after:duration-300 after:content-[''] hover:text-yellow-400 hover:after:w-full hover:after:shadow-[0_2px_8px_rgba(250,204,21,0.6)] ${
                pathname === href
                  ? "text-yellow-400 after:w-full after:shadow-[0_2px_8px_rgba(250,204,21,0.4)]"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-[#111111] text-white md:hidden"
          >
            <div className="flex flex-col items-center space-y-4 py-6 text-lg font-medium">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`hover:text-yellow-400 ${
                    pathname === href ? "text-yellow-400" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
