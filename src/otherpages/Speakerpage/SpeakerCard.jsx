import CldImage from "@/components/Images/CldImage";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function SpeakerCard({
  publicId,
  name,
  title,
  twitter,
  linkedin,
  instagram,
  ...props
}) {
  return (
    <motion.div
      {...props}
      className="relative group flex flex-col items-center gap-2 glass-morphism p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Speaker Image */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <CldImage
          src={publicId}
          alt={name}
          width={200}
          height={200}
          key={publicId}
          loading="lazy"
          className="rounded-full overflow-hidden h-64 w-64 object-cover aspect-square shadow-md border-4 border-white"
        />
      </motion.div>

      {/* Name and Title */}
      <motion.h1
        className="text-lg md:text-xl font-bold text-center mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {name}
      </motion.h1>
      <motion.p
        className="text-sm md:text-base text-center text-gray-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.p>

      {/* Desktop Hover Socials */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl hidden md:group-hover:flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="flex gap-6 text-white text-4xl"
          whileHover="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {twitter && (
            <motion.a
              href={twitter}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: "#1DA1F2" }}
              variants={{ visible: { opacity: 1, y: 0 } }}
            >
              <FaSquareXTwitter />
            </motion.a>
          )}
          {linkedin && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: "#0077b5" }}
              variants={{ visible: { opacity: 1, y: 0 } }}
            >
              <FaLinkedin />
            </motion.a>
          )}
          {instagram && (
            <motion.a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: "#E1306C" }}
              variants={{ visible: { opacity: 1, y: 0 } }}
            >
              <FaInstagram />
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      {/* Mobile Static Socials */}
      <div className="flex md:hidden gap-4 mt-4 w-full justify-center text-xl text-gray-800">
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className="border-b border-gray-400 pb-1"
          >
            <FaSquareXTwitter />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="border-b border-gray-400 pb-1"
          >
            <FaLinkedin />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="border-b border-gray-400 pb-1"
          >
            <FaInstagram />
          </a>
        )}
      </div>
    </motion.div>
  );
}

SpeakerCard.propTypes = {
  publicId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  linkedin: PropTypes.string,
  instagram: PropTypes.string,
};

export default SpeakerCard;
