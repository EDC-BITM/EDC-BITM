import { motion } from "framer-motion";

const IATIgniting = () => {
    return (
        <section className="w-full py-16 sm:py-20 lg:py-24 overflow-hidden px-4">
            <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
                {/* Main Heading */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-tight">
                        <span className="text-white">IAT </span>
                        <span
                            className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 25%, #EC4899 75%, #F59E0B 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Igniting Tomorrow's
                        </span>
                        <br />
                        <span
                            className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Tech Today.
                        </span>
                    </h1>
                </div>

                {/* Register Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                >
                    {/* Animated background glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full opacity-0"
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(245, 158, 11, 0.4) 100%)",
                            filter: "blur(20px)",
                        }}
                    />

                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: [
                                "0 0 20px rgba(139, 92, 246, 0.5)",
                                "0 0 40px rgba(236, 72, 153, 0.4)",
                                "0 0 60px rgba(245, 158, 11, 0.3)",
                                "0 20px 40px rgba(0, 0, 0, 0.3)"
                            ].join(", "),
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative px-10 sm:px-16 py-4 sm:py-5 text-white font-bold text-lg sm:text-xl rounded-full overflow-hidden group"
                        style={{
                            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
                            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                    >
                        {/* Animated gradient overlay */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{
                                background: "linear-gradient(135deg, #A855F7 0%, #F472B6 50%, #FBBF24 100%)",
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                                width: "100%",
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />

                        {/* Button text with subtle animation */}
                        <motion.span
                            className="relative z-10 tracking-wider"
                            whileHover={{ letterSpacing: "0.1em" }}
                            transition={{ duration: 0.2 }}
                        >
                            REGISTER NOW
                        </motion.span>

                        {/* Floating particles effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                                    style={{
                                        left: `${20 + i * 12}%`,
                                        top: `${30 + (i % 2) * 40}%`,
                                    }}
                                    animate={{
                                        y: [-2, -8, -2],
                                        opacity: [0.3, 1, 0.3],
                                        scale: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default IATIgniting;