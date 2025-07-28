import blobL from "@assets/blobs/blobL.png?w=100&format=webp&quality=90&as=meta";
import blobR from "@assets/blobs/blobR.png?w=100&format=webp&quality=90&as=meta";
import bhorukaLogo from "./Startupspic/bhoruka.png?w=100&format=webp&quality=90";
import auraLogo from "./Startupspic/aura.png?w=100&format=webp&quality=90";
import triviumLogo from "./Startupspic/trivium.png?w=100&format=webp&quality=90";
import tanaashiLogo from "./Startupspic/tanaashi.png?w=100&format=webp&quality=90";
import tejasLogo from "./Startupspic/tejas.png?w=100&format=webp&quality=90";
import netwovenLogo from "./Startupspic/netwoven.png?w=100&format=webp&quality=90";
import crmnextLogo from "./Startupspic/crmnext.png?w=100&format=webp&quality=90";
import foodsafetylogo from "./Startupspic/foodsafety.svg";
import ekoLogo from "./Startupspic/eko.svg";
import dbsyncLogo from "./Startupspic/dbsync.svg";
import Lenskartlogo from "./Startupspic/lenskart.svg";
import cropinLogo from "./Startupspic/cropin.png?w=100&format=webp&quality=90";
import indibnilogo from "./Startupspic/indibni.svg";
import myoperatorLogo from "./Startupspic/myoperator.png?w=100&format=webp&quality=90";
import easebuzzlogo from "./Startupspic/easebuzz.png?w=100&format=webp&quality=90";
import piggylogo from "./Startupspic/piggy.svg";
import khabrilogo from "./Startupspic/khabri.png?w=100&format=webp&quality=90";
import Whitehatlogo from "./Startupspic/WhiteHat.svg";
import quolumlogo from "./Startupspic/quolum.png?w=100&format=webp&quality=90";
import swiftskilllogo from "./Startupspic/swiftskill.png?w=100&format=webp&quality=90";
import floworkslogo from "./Startupspic/floworks.png?w=100&format=webp&quality=90";
import alcheymistlogo from "./Startupspic/alcheymist.png?w=100&format=webp&quality=90";
import zlurilogo from "./Startupspic/zluri.png?w=100&format=webp&quality=90";
import CldImage from "@/components/Images/CldImage";
import { IoRocket, IoTrophySharp } from "react-icons/io5";
import { GiUnicorn } from "react-icons/gi";
import { scroller } from "react-scroll";
import { motion } from "framer-motion";
import HoverTextTranslateEffect from "@/components/Animations/HoverTextTranslate";

const Startups = () => {
  const timeline = [
    {
      year: "1958",
      company: "Bhoruka",
      desc: "Charting a pioneering path in the rapidly growing field of renewable energy.",
      logo: bhorukaLogo,
    },
    {
      year: "1989",
      company: "Aura Inc.",
      desc: "Manufacturing instrumentation fittings, valves, and temperature sensor assemblies.",
      logo: auraLogo,
    },
    {
      year: "1995",
      company: "TriVium",
      desc: "A leading provider of smart business productivity solutions for voice and data convergence.",
      logo: triviumLogo,
    },
    {
      year: "1999",
      company: "Tanaashi",
      desc: "Providing complete solutions to the industry in the fields of software development.",
      logo: tanaashiLogo,
    },
    {
      year: "2000",
      company: "TEJAS Networks",
      desc: "A leading telecom product company for network infrastructure across the globe.",
      logo: tejasLogo,
    },
    {
      year: "2001",
      company: "Netwoven",
      desc: "Helping businesses embrace digital transformation through scalable cloud solutions.",
      logo: netwovenLogo,
    },
    {
      year: "2002",
      company: "CRMNEXT",
      desc: "A leading CRM solution that improves customer experience through automation.",
      logo: crmnextLogo,
    },
    {
      year: "2007",
      company: "Eko",
      desc: "An Indian fintech company providing services for major banks like SBI, ICICI, and Yes Bank.",
      logo: ekoLogo,
    },
    {
      year: "2009",
      company: "DBSync",
      desc: "An on-demand integration provider connecting any combination of SaaS and cloud applications.",
      logo: dbsyncLogo,
    },
    {
      year: "2009",
      company: "Food Safety Works",
      desc: "Bridging the knowledge gap in the industry about Food Safety Management Systems.",
      logo: foodsafetylogo,
    },
    {
      year: "2010",
      company: "Lenskart",
      desc: "An Indian optical prescription eyewear retail chain, revolutionizing the industry.",
      logo: Lenskartlogo,
    },
    {
      year: "2010",
      company: "Cropin",
      desc: "Offering an intelligent, self-evolving system that delivers farming solutions to agriculture.",
      logo: cropinLogo,
    },
    {
      year: "2012",
      company: "Indibni",
      desc: "The root and regulatory body, assuring expansion of the Indibrand and its vision.",
      logo: indibnilogo,
    },
    {
      year: "2013",
      company: "My Operator",
      desc: "A cloud-based telephony service provider company based in New Delhi.",
      logo: myoperatorLogo,
    },
    {
      year: "2014",
      company: "Easebuzz",
      desc: "One of India's leading digital payment solution platforms for over 70,000 businesses.",
      logo: easebuzzlogo,
    },
    {
      year: "2016",
      company: "Piggy",
      desc: "On a mission to democratize personal finance for over a billion Indians.",
      logo: piggylogo,
    },
    {
      year: "2017",
      company: "Khabri",
      desc: "India's fastest-growing vernacular audio podcast platform for the next billion users.",
      logo: khabrilogo,
    },
    {
      year: "2018",
      company: "WhiteHat Jr",
      desc: "An online educational tech company providing coding classes for children.",
      logo: Whitehatlogo,
    },
    {
      year: "2019",
      company: "Quolum",
      desc: "Building a new stack to help every company effectively consume SaaS at scale.",
      logo: quolumlogo,
    },
    {
      year: "2020",
      company: "SwiftSkill",
      desc: "An esports analytics, strategy, and team collaboration platform for gamers.",
      logo: swiftskilllogo,
    },
    {
      year: "2021",
      company: "Floworks",
      desc: "Using AI-powered sales employees to automate outreach, replies, and CRM updates.",
      logo: floworkslogo,
    },
    {
      year: "2023",
      company: "Alchesymist AI",
      desc: "Building the future of the AI agent workforce, backed by prominent VCs.",
      logo: alcheymistlogo,
    },
    {
      year: "2024",
      company: "Zluri",
      desc: "A next-gen Identity Governance platform for IT and security teams.",
      logo: zlurilogo,
    },
  ];

  return (
    <div className="bg-gray-100 font-sans relative text-gray-800 overflow-x-hidden">
      <div className="relative w-full h-[54rem] md:h-[700px] lg:h-[800px] overflow-hidden">
        <CldImage
          src="startuphome_p6blhu"
          height={1080}
          width={1920}
          alt="Hero Image"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 sm:px-6">
          <HoverTextTranslateEffect
            firstLine={" Innovating From The"}
            secondLine={"Heart Where Ideas Meet Impact"}
            className="text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-50/90 mb-4"
          />

          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              className="mt-8 text-lg sm:text-2xl text-gray-200 max-w-2xl text-center flex flex-wrap justify-center gap-x-2"
            >
              {"Explore the legacy of entrepreneurship born at BIT Mesra"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: index * 0.099,
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </div>
          {/* Button */}

          <div
            className="group mt-8 duration-150 ease-in-out hover:bg-[whitesmoke]  rounded-[10px] text-2xl border border-white  hover:scale-110 backdrop-blur-sm text-black h-auto"
            onClick={() => {
              scroller.scrollTo("startups", {
                smooth: true,
                duration: 500,
                offset: -70,
              });
            }}
          >
            <div className="flex justify-center items-center">
              <button className="group-hover:text-black cursor-pointer px-8 py-1.5 text-white transition ease-in-out">
                Explore Startups
              </button>
            </div>
          </div>
        </div>
      </div>

      <section
        id="startups"
        className="max-w-7xl  z-20 glass-morphic mx-auto p-6 sm:p-10 shadow-2xl rounded-xl md:-mt-20 relative animate-fade-in-up flex flex-col md:flex-row gap-10"
      >
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <div className="h-[50px] w-[50px] bg-[#FED853] rounded-md shadow-md"></div>
            <h1 className="text-[28px] ml-[-35px] font-bold uppercase tracking-wide text-gray-800">
              Startups
            </h1>
          </div>

          <p className="text-md text-gray-600 leading-relaxed">
            Entrepreneurship Development Cells (EDCs) are campus-based
            initiatives that aim to inspire and support students in becoming
            future entrepreneurs by fostering innovation, creativity, and
            leadership. They provide a platform where students can explore
            ideas, build startups, and gain real-world business exposure through
            mentorship, workshops, networking events, and access to funding.
            EDCs often collaborate with industry experts, incubators, and
            investors to guide students in transforming their concepts into
            viable ventures. By bridging the gap between academics and practical
            entrepreneurship, EDCs play a crucial role in developing
            problem-solving skills, risk-taking ability, and business acumen
            among students, empowering them to become change-makers in the
            modern economy.
          </p>

          <div className="flex flex-wrap justify-around text-center mt-10 border-t pt-8 gap-6">
            <div className="flex flex-col items-center">
              <span className="text-yellow-500 text-4xl font-bold flex items-center gap-2">
                <IoRocket className="text-yellow-400 text-3xl" />
                50+
              </span>
              <p className="text-gray-500 mt-1 font-semibold">Startups</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-500 text-4xl font-bold flex items-center gap-2">
                <IoTrophySharp className="text-blue-400 text-3xl" />
                40+
              </span>
              <p className="text-gray-500 mt-1 font-semibold">
                Success Stories
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-500 text-4xl font-bold flex items-center gap-2">
                <GiUnicorn className="text-red-400 text-3xl" />
                2+
              </span>
              <p className="text-gray-500 mt-1 font-semibold">Unicorns</p>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="flex-1 grid gap-6">
          <div className="aspect-video overflow-hidden rounded-2xl shadow-xl">
            <CldImage
              src="13781_fgzlte"
              width={600}
              height={400}
              loading="lazy"
              alt="Startup Collaboration"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl shadow-xl">
            <CldImage
              src="859_ukifuv"
              width={600}
              height={400}
              loading="lazy"
              alt="Innovative Minds"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <div className="relative z-20 max-w-5xl mx-auto mt-10 ">
        <div className="hidden md:block">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-300 via-teal-400 to-blue-500 rounded-full" />

          {timeline.map((item, index) => (
            <div
              key={index}
              className={`group mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-5/12" />

              {/* Year Marker */}
              <div className="z-20 flex items-center justify-center order-1 bg-gray-800 shadow-xl w-24 h-24 rounded-full transition-transform duration-300 group-hover:scale-110">
                <h1 className="font-bold text-xl text-white">{item.year}</h1>
              </div>

              {/* Card */}
              <div className="order-1 w-5/12 px-2 py-4">
                <div className="p-6 glass-morphic backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                    <h3 className="font-bold text-xl text-gray-800">
                      {item.company}
                    </h3>
                  </div>
                  <p className="text-sm leading-snug tracking-wide text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Timeline - Vertical Left-aligned */}
        <div className="md:hidden px-4 z-20 mt-12">
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-300 via-teal-400 to-blue-500 rounded-full" />

          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-start mb-8">
              {/* Year Marker */}
              <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-xl z-10 flex-shrink-0">
                <span className="font-bold text-xs text-white">
                  {item.year}
                </span>
              </div>

              {/* Card */}
              <div className="ml-6 flex-1">
                <div className="p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="w-10 h-10 object-contain rounded-lg"
                    />
                    <h3 className="font-bold text-lg text-gray-800">
                      {item.company}
                    </h3>
                  </div>
                  <p className="text-sm leading-snug tracking-wide text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blobs */}
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[13rem] z-10 left-0 top-[53rem] pointer-events-none
                    max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[13rem] z-10 right-0 top-[78rem] pointer-events-none
                    max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[14rem] z-10 left-0 top-[120rem] pointer-events-none
                    max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-10 right-0 top-[180rem] pointer-events-none
                    max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[12rem] z-10 left-0 top-[230rem] pointer-events-none
                    max-[649px]:w-0"
      />
      <img
        src={blobR.src}
        alt=""
        className="absolute w-[12rem] z-10 right-0 top-[300rem] pointer-events-none
                    max-[649px]:w-0"
      />
      <img
        src={blobL.src}
        alt=""
        className="absolute w-[12rem] z-10 left-0 top-[350rem] pointer-events-none
                    max-[649px]:w-0"
      />
    </div>
  );
};

export default Startups;
