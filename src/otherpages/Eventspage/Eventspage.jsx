import React from "react";
import "../Eventspage/Eventspage.css";
import CldImageData from "@/data/CldImage.json";
import CldImage from "../../components/Images/CldImage";
import leaf1 from "../Eventspage/leaf.png";
import leaf2 from "../Eventspage/leaf2.png";
import Socials from "../../components/Home/socials/socials";
import eventsbg from "../Eventspage/eventsbg.png";
import roadmap from "../Eventspage/roadmap.png";
import prize from "../Eventspage/prize.png";
import mobilebg from "../Eventspage/mobilebg.jpeg";
import Mobile from "../Eventspage/esummitmob.jpeg";
import Desktop from "../Eventspage/esummitlandscape.jpeg";
import comingsoondesktop from "../Eventspage/e-summitdesktop.jpg";
import blob from "/blobs.png";
import blobR from "/blobR.png";
import card1 from "../Eventspage/card1.png";
import card2 from "../Eventspage/card2.png";
import card3 from "../Eventspage/card3.png";
import card4 from "../Eventspage/card4.png";
import card5 from "../Eventspage/card5.png";
import card6 from "../Eventspage/card6.png";
import cardimg1 from "../Eventspage/cardimg1.png";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-scroll";
import { useState } from "react";
import header_bg from "../Eventspage/header_bg.png";
import { motion } from "framer-motion";

function Eventspage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const heroImage = CldImageData.Events.hero[0];
  
  const eventsImage = CldImageData.Events.formalEvents;
  const eventsImage2 = CldImageData.Events.semiFormalEvents;
  const eventsImage3 = CldImageData.Events.informalEvents;

  
  const AllEvents = [
    {
      image: card4,
      title: "Formal Events",
      textcolour: "text-white",
      caption: "Elevating Experiences with Distinguished Events",
    },
    {
      image: card5,
      title: "Semi-Formal Events",
      textcolour: "text-white",
      caption:
        "Bridging Professionalism and Creativity in Semi-Formal Gatherings",
    },
    {
      image: card6,
      title: "Informal Events",
      textcolour: "text-black",
      caption: "Fostering Connections through Casual and Fun Gatherings",
    },
  ];

  const upVariant = {
  show: { y: 0, opacity: 1 },
  hover: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

const downVariant = {
  show: { y: 40, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};



  return (
    <>
      <div className="h-auto w-full">
        <a>

         <div className="relative h-screen w-full">
  {/* Background Image */}
     <CldImage
             src={heroImage.publicId}
             alt={heroImage.alt}
             height={heroImage.height}
             width={heroImage.width}
             loading="eager"
             className="w-full h-full"
           />

  {/* Overlay Text on Image */}
  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center">
    <h1 className="text-4xl sm:text-5xl uppercase font-extrabold sm:p-4 text-white">
      <motion.div
        initial="show"
        whileHover="hover"
        className="overflow-hidden cursor-default lg:h-14 relative"
      >
        <motion.div className="absolute inset-0" variants={upVariant}>
          Celebrating moments that sparked change
        </motion.div>
        <motion.div variants={downVariant}>
          Celebrating moments that sparked change
        </motion.div>
      </motion.div>

      <motion.div
        initial="show"
        whileHover="hover"
        className="overflow-hidden cursor-default lg:h-14 relative"
      >
        <motion.div className="absolute inset-0" variants={upVariant}>
          Through events that inspire connect and lead
        </motion.div>
        <motion.div variants={downVariant}>
          Through events that inspire connect and lead
        </motion.div>
      </motion.div>
    </h1>
  </div>
</div>


        </a>

        {/* <div className="eventsbg h-auto w-full text-black">
        <img
          src={eventsbg}
          alt=""
          className="hidden md:block"
        />
        <img
          src={mobilebg}
          alt=""
          className="block md:hidden"
        />
        <div className="flex justify-center recbox1 md:p-[5rem] p-4" data-aos="zoom-in">
          <div className="glass-morphism md:w-[80%] w-full md:p-8 p-4">
            <div className="flex flex-row justify-start items-center">
              <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
              <h1 className="text-[25px] ml-[-30px] font-bold">About Innovate-A-Thon</h1>
            </div>
            <div className="mt-5 font-normal">
              <p className="text-base">Innovate-a-Thon is an annual event hosted by the Entrepreneurship Development Cell at BIT Mesra, offering budding innovators a chance to explore their technical talents and create something innovative during a 24-hour product development hackathon. With additional speaker sessions and workshops, the event aims to cultivate ideas and discussions, ultimately making a significant impact and driving transformative change.</p>
            </div>
            <div className="flex justify-center mt-4">
              <a href="https://unstop.com/hackathons/innovate-a-thon-20-bit-mesra-ranchi-1112526?ref=digitomize&utm_source=digitomize">
                <button className=" register-button p-4 rounded-xl bg-[#FED853] font-bold">Register Now!</button>
              </a>
            </div>
          </div>
        </div>
        <div className=" glass-morphic lg:m-20 mt-32 p-4 lg:p-12 shadow-2xl rounded-2xl" data-aos="flip-up" data-aos-easing="ease-in-back" data-aos-delay="200" data-aos-offset="0" data-aos-mirror = "true">
          <div className="flex flex-row justify-start items-center">
            <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
            <h1 className="text-[25px] ml-[-25px] font-bold">Road Map</h1>
          </div>
          <div className="md:px-28 flex flex-col justify-center md:gap-20 gap-8 text-center " >
            <div className="my-20">
              <img src={roadmap} alt="" />
            </div>
            <div>
              <h1 className="text-xl md:text-5xl font-bold">Last Date To Register: 18 August</h1>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-mirror="true">
        <div className="flex flex-col justify-center items-center gap-4 mt-20 p-8 text-center" >
          <div>
            <h1 className="text-5xl font-bold">Win Exciting Prizes!</h1>
          </div>
          <div>
            <img src={prize} alt="" />
          </div>
        </div> */}

        <img src={blob} className="blob1" />
        <img src={blobR} className="blob6" />
        <img src={blob} className="blob2" />
        <img src={blobR} className="blob3" />

        <div className="m-4 font-semibold text-gray-700 p-8">
          <p className="sm:text-[35px] text-[20px]  text-center font-poppins mt-10">
            Broad Spectrum of Events we offer!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {AllEvents.map((event, index) => (
            <div key={index} className="event-card-container relative">
              <div className="event-card relative">
                <img src={event.image} alt="Event" className="event-image" />
                <h2
                  className={`font-semibold  text-[25px]  absolute top-6 text-center m-4 w-[265px]  ${event.textcolour}`}
                >
                  {event.title}
                </h2>
                <h3
                  className={`text-center text-[13px] absolute top-20 w-[300px] ${event.textcolour}`}
                >
                  {event.caption}
                </h3>

                <Link
                  to={`events-${index + 1}`}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setHoveredIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button
                    className={`absolute left-[70px] right-[97px] top-[155px] transition ease-in-out ${
                      hoveredIndex === index ? "scale-105" : ""
                    } w-[160px] h-[45px] rounded-full bg-[#ffffff] font-bold`}
                  >
                    Explore More
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/30 w-screen overflow-hidden backdrop-blur-md">
          <div className="flex lg:flex-row bg-white/30  text-center justify-center backdrop-blur-md items-center">
            <img src={leaf1} alt="" className="sm:h-56 h-28 mt-10" />
            <p className="sm:text-[25px] text-[15px] mt-6">
              Our Events are more than just gatherings. They are opportunities
              to transform your entrepreneurial journey. Unleash the
              Entrepreneur in you and connect with us for the latest updates and
              exclusive announcements.!
            </p>
            <img src={leaf2} alt="" className="md:h-56 h-28" />
          </div>
        </div>
        {/* </div> */}
      </div>

      <div id="events-1">
        <div className="md:m-20 m-4 mt-20">
          <div
            className="flex flex-col justify-center items-center lg:m-4 p-4 md:p-2 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20"
            data-aos="fade-up"
            data-aos-mirror="true"
          >
            <h1 className="font-bold text-[32px] uppercase  ">Formal Events</h1>

            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {eventsImage.map((event, index) => (
                <div key={index} className="event-card-container">
                  <div className="event-card">
                    <img
                      src={`https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752419389/${event.publicId}.png`}
                      alt={event.alt}
                      className="event-image"
                    />
                    <div className="event-details">
                      <div className="event-header">
                        <h2>{event.title}</h2>
                      </div>
                      <p>VENUE: {event.venue}</p>
                      <h4>DATE: {event.date}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="events-2">
        <div className="md:m-20 m-4 mt-20">
          <div
            className="flex flex-col justify-center items-center lg:m-4 p-4 md:p-2 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20"
            data-aos="fade-up"
            data-aos-mirror="true"
          >
            <h1 className="font-bold text-[32px] uppercase">
              Semi-Formal Events
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {eventsImage2.map((event, index) => (
                <div key={index} className="event-card-container">
                  <div className="event-card">
                    <img
                      src={`https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752419204/${event.publicId}.png`}
                      alt={event.alt}
                      className="event-image"
                    />
                    <div className="event-details">
                      <div className="event-header">
                        <h2>{event.title}</h2>
                      </div>
                      <p>VENUE: {event.venue}</p>
                      <h4>DATE: {event.date}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="events-3">
        <div className="md:m-20 m-4 mt-20">
          <div
            className="flex flex-col justify-center items-center lg:m-4 p-4 md:p-2 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20"
            data-aos="fade-up"
            data-aos-mirror="true"
          >
            <h1 className="font-bold text-[32px] uppercase">Informal Events</h1>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {eventsImage3.map((event, index) => (
                <div key={index} className="event-card-container">
                  <div className="event-card">
                    <img
                      src={`https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752419631/${event.publicId}.png`}
                      alt={event.alt}
                      className="event-image"
                    />
                    <div className="event-details">
                      <div className="event-header">
                        <h2>{event.title}</h2>
                      </div>
                      <p>VENUE: {event.venue}</p>
                      <h4>DATE: {event.date}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Socials />
    </>
  );
}

export default Eventspage;
