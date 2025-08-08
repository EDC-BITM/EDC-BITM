import { motion } from "framer-motion";
import IgniteBanner from "../assets/Ignite_Banner5.jpg";



const IATIgniting = () => {
    return (
        <section id="igniting" className="w-full py-16 sm:py-20 lg:py-24 overflow-hidden px-4" style={{
            backgroundImage: `url(${IgniteBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
                {/* Main Heading */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 style={{ lineHeight: '1.3' }} className="text-center text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal leading-tight sm:leading-[5.56rem] tracking-tight sm:tracking-[-0.0556rem] bg-clip-text text-transparent">
                        <span
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
                        className="absolute inset-0 rounded-full"
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.4) 50%, rgba(245, 158, 11, 0.4) 100%)",
                            filter: "blur(20px)",
                            transformOrigin: "center center"
                        }}
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="relative cursor-pointer px-8 sm:px-12 py-3 sm:py-4 text-white font-bold text-base sm:text-lg md:text-xl rounded-full overflow-hidden group"
                        style={{
                            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F59E0B 100%)",
                            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}

                        onClick={() => window.open("https://unstop.com/p/innovate-a-thon-30-bit-mesra-ranchi-1529762", "_blank")}
                    >
                        {/* Animated gradient overlay */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{
                                background: "linear-gradient(135deg, #A855F7 0%, #F472B6 50%, #FBBF24 100%)",
                                transition: "opacity 0.3s",
                            }}
                        />

                        {/* Shimmer effect */}
                        <div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                                width: "100%",
                                transition: "transform 0.6s ease-in-out",
                            }}
                        />

                        {/* Button text */}
                        <span className="relative z-10 tracking-wider">REGISTER NOW</span>

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
