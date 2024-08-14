import React from "react"
import '../Eventspage/Eventspage.css'
import event1 from '../Eventspage/Image(EVENT)/event1.png'
import event3 from '../Eventspage/Image(EVENT)/event3.png'
import event4 from '../Eventspage/Image(EVENT)/event4.png'
import event6 from '../Eventspage/Image(EVENT)/event6.png'
import event14 from '../Eventspage/Image(EVENT)/event14.png'
import leaf1 from '../Eventspage/leaf.png'
import leaf2 from '../Eventspage/leaf2.png'
import Slidermain from '/src/components/Slider/Slidermain.jsx'
import Socials from "../../components/socials/socials"
import eventsbg from '../Eventspage/eventsbg.png'
import roadmap from '../Eventspage/roadmap.png'
import prize from '../Eventspage/prize.png'
import mobilebg from '../Eventspage/mobilebg.jpeg'

function Eventspage() {
  return (
    <>
      <div className="eventsbg h-auto w-full text-black">
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
        <div className="flex justify-center recbox1 md:p-[5rem] p-4">
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
                <button className="p-4 rounded-xl bg-[#FED853] font-bold">Register Now!</button>
              </a>
            </div>
          </div>
        </div>
        <div className="glass-morphic lg:m-20 mt-32 p-4 lg:p-12 shadow-2xl rounded-2xl ">
          <div className="flex flex-row justify-start items-center">
            <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
            <h1 className="text-[25px] ml-[-25px] font-bold">Road Map</h1>
          </div>
          <div className="md:px-28 flex flex-col justify-center md:gap-20 gap-8 text-center">
            <div className="mt-12">
              <img src={roadmap} alt="" />
            </div>
            <div>
              <h1 className="text-xl md:text-5xl font-bold">Last Date To Register: 18 August</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-20 p-8 text-center">
          <div>
            <h1 className="text-5xl font-bold">Win Exciting Prizes!</h1>
          </div>
          <div>
            <img src={prize} alt="" />
          </div>
        </div>
        <div className="bg-white w-screen overflow-hidden mt-20">
          <div className="flex lg:flex-row bg-white p-20 text-center justify-center items-center">
            <img src={leaf1} alt="" className="md:h-56" />
            <p className="md:text-[32px]">Our Events are more than just gatherings. They are opportunities to transform your entrepreneurial journey. Unleash the Entrepreneur in you and connect with us for the latest updates and exclusive announcements.!</p>
            <img src={leaf2} alt="" className="md:h-56" />
          </div>
        </div>
        <div className="md:m-20 m-4 mt-20">
          <div className="flex flex-col justify-center items-center lg:m-4 p-4 md:p-2 shadow-2xl rounded-2xl">
            <h1 className="font-bold text-[32px] uppercase">Past Events</h1>
            <div className="flex md:flex-row flex-col justify-center ">
              <div className="event-card-container">
                <div className="event-card">
                  <img src={event6} alt="Event" className="event-image" />
                  <div className="event-details">
                    <div className="event-header">
                      <h2>STOCK STOCISM</h2>
                    </div>
                    <p>VENUE: ROOM 312</p>
                    <h4>DATE: 24/03/24</h4>
                  </div>
                </div>
              </div>
              <div className="event-card-container">
                <div className="event-card">
                  <img src={event1} alt="Event" className="event-image" />
                  <div className="event-details">
                    <div className="event-header">
                      <h2>STARTUP MELA</h2>
                    </div>
                    <p>VENUE: ROOM 312</p>
                    <h4>DATE: 24/03/24</h4>
                  </div>
                </div>
              </div>
              <div className="event-card-container">
                <div className="event-card">
                  <img src={event3} alt="Event" className="event-image" />
                  <div className="event-details">
                    <div className="event-header">
                      <h2>INNOVATE-A-THON</h2>
                    </div>
                    <p>VENUE: ROOM 312</p>
                    <h4>DATE: 24/03/24</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col justify-center">
              <div className="event-card-container">
                <div className="event-card">
                  <img src={event14} alt="Event" className="event-image" />
                  <div className="event-details">
                    <div className="event-header">
                      <h2>IPL AUCTION</h2>
                    </div>
                    <p>VENUE: ROOM 312</p>
                    <h4>DATE: 24/03/24</h4>
                  </div>
                </div>
              </div>
              <div className="event-card-container">
                <div className="event-card">
                  <img src={event4} alt="Event" className="event-image" />
                  <div className="event-details">
                    <div className="event-header">
                      <h2>MARKETING SPINOFF</h2>
                    </div>
                    <p>VENUE: ROOM 312</p>
                    <h4>DATE: 24/03/24</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Slidermain />
        <Socials />
      </div>
    </>
  )
}

export default Eventspage