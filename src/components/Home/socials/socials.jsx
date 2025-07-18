import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import CldImage from "@/components/Images/CldImage";
import cldImageData from "@/data/CldImage.json";

function Socials() {
  return (
    <div className="text-white relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <CldImage
          className="absolute inset-0 w-full h-full object-cover"
          src={cldImageData.Home.socials[0].publicId}
          alt={cldImageData.Home.socials[0].alt}
          height={cldImageData.Home.socials[0].height}
          width={cldImageData.Home.socials[0].width}
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Content section */}
      <div className="relative z-10">
        <div className="flex flex-row justify-center items-center p-12">
          <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
          <h1
            className="text-[25px] ml-[-30px] font-bold"
            style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
          >
            Social Handles
          </h1>
        </div>
        <motion.div
          className="text-center text-2xl lg:text-[45px] font-bold px-4"
          style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Subscribe To Get The Latest News And Updates
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 p-12">
          <a
            href="https://www.instagram.com/edcbitmesra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="bg-white text-black border-4 border-[#FED853] px-10 py-4 flex items-center justify-center space-x-2 rounded-xl text-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#FED853",
                boxShadow: "0px 0px 8px rgba(254, 216, 83, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div whileHover={{ rotate: 15 }}>
                <FaInstagram className="text-3xl" />
              </motion.div>
              <span>Instagram</span>
            </motion.button>
          </a>
          <a
            href="https://www.linkedin.com/company/edcbitmesra/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="bg-white text-black border-4 border-[#FED853] px-12 md:px-10 py-4 flex items-center justify-center space-x-2 rounded-xl text-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#FED853",
                boxShadow: "0px 0px 8px rgba(254, 216, 83, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div whileHover={{ rotate: 15 }}>
                <FaLinkedinIn className="text-3xl" />
              </motion.div>
              <span>LinkedIn</span>
            </motion.button>
          </a>
          <a
            href="https://www.facebook.com/edcbitmesra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              className="bg-white text-black border-4 border-[#FED853] px-10 py-4 flex items-center justify-center space-x-2 rounded-xl text-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#FED853",
                boxShadow: "0px 0px 8px rgba(254, 216, 83, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div whileHover={{ rotate: 15 }}>
                <FaFacebookF className="text-3xl" />
              </motion.div>
              <span>Facebook</span>
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Socials;
