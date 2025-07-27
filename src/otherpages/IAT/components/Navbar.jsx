import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../SquareIATLogo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "#", active: true },
        { name: "Schedule", href: "#" },
        { name: "Speakers", href: "#" },
        { name: "Events", href: "#" },
        { name: "News/Updates", href: "#" },
    ];

    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                className="relative bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl px-6 lg:px-8 shadow-lg"
                whileHover={{
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)",
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Top-left border accent */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-grey-400/60 rounded-tl-2xl"></div>

                <div className="flex items-center justify-between h-16 lg:h-18 w-full min-w-[400px] sm:min-w-[500px] lg:min-w-[1000px]">
                    <div className="flex items-center space-x-3">
                        <img
                            src={logo}
                            alt="IAT Logo"
                            className="w-8 h-8 lg:w-10 lg:h-10"
                        />
                        <span className="text-white font-semibold text-lg lg:text-xl">
                            Innovate-A-Thon
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${item.active
                                    ? "text-white"
                                    : "text-gray-300"
                                    }`}
                                whileHover={{
                                    color: "#ffffff",
                                    scale: 1.05,
                                }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300
                                }}
                            >
                                {item.name}
                                {item.active && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                {/* Hover effect */}
                                <motion.div
                                    className="absolute inset-0 bg-white/5 rounded-full border border-white/10 opacity-0"
                                    whileHover={{
                                        opacity: 1,
                                        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Register Button */}
                    <div className="hidden lg:block">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 8px 20px rgba(101, 94, 253, 0.4), 0 0 15px rgba(101, 94, 253, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-[#655EFD] text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                        >
                            Register
                        </motion.button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="lg:hidden bg-black/40 backdrop-blur-md rounded-lg mt-2 mb-4 border border-white/10 absolute top-full left-0 right-0"
                >
                    <div className="px-4 py-4 space-y-3">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${item.active
                                    ? "text-white bg-white/10"
                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                        <div className="pt-3 border-t border-white/10">
                            <motion.button
                                className="w-full px-4 py-2 bg-[#655EFD] hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 4px 12px rgba(101, 94, 253, 0.3)"
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Register
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav >
    );
};

export default Navbar;