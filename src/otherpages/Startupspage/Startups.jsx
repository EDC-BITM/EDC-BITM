import React from "react";

// Image imports
import startup1 from "./Startupspic/img1.png";
import startup2 from "./Startupspic/img2.png";
import heroImage from "./Startupspic/startuphome.png";
import bhorukaLogo from "./Startupspic/bhoruka.png";
import auraLogo from "./Startupspic/aura.png";
import triviumLogo from "./Startupspic/trivium.png";
import tanaashiLogo from "./Startupspic/tanaashi.png";
import tejasLogo from "./Startupspic/tejas.png";
import netwovenLogo from "./Startupspic/netwoven.png";
import crmnextLogo from "./Startupspic/crmnext.png";

const Startups = () => {
  const timeline = [
    {
      year: "1958",
      company: "Bhoruka",
      desc: "Bhoruka Power is charting its own pioneering path in the rapidly growing field of renewable energy.",
      logo: bhorukaLogo,
    },
    {
      year: "1989",
      company: "Aura Inc.",
      desc: "We manufacture instrumentation fittings, valves, and systems for sensor assemblies and process control.",
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
      desc: "Tanaashi Software develops and delivers ERP software for SMEs and other verticals.",
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
  ];

  return (
    <div className="bg-[#f1f8f4] font-sans text-gray-800">
      {/* Hero Section */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
            INNOVATING FROM THE HEART OF <br /> BIT MESRA, WHERE IDEAS MEET IMPACT.
          </h1>
        </div>
      </div>

      {/* Startup Info Section */}
      <section className="max-w-6xl mx-auto p-8 bg-white shadow rounded-lg mt-[-4rem] relative z-10">
        <h2 className="text-green-700 font-bold text-lg mb-4">STARTUPS</h2>
        <p className="text-sm leading-relaxed">
          Entrepreneurship Development Cells (EDCs) are campus-based initiatives that aim to inspire and support students in becoming future entrepreneurs by fostering innovation, creativity, and leadership. They provide a platform where students can explore ideas, build startups, and gain real-world business exposure through mentorship, workshops, networking events, and access to funding.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <img src={startup1} alt="Startup 1" className="rounded-lg w-full h-auto" />
          <img src={startup2} alt="Startup 2" className="rounded-lg w-full h-auto" />
        </div>
        <div className="flex justify-around text-center mt-6">
          <div>
            <span className="text-yellow-500 text-2xl font-bold">50+</span>
            <p>Startups</p>
          </div>
          <div>
            <span className="text-blue-500 text-2xl font-bold">40+</span>
            <p>Success</p>
          </div>
          <div>
            <span className="text-orange-600 text-2xl font-bold">2+</span>
            <p>Unicorns</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-6xl mx-auto p-8">
        <div className="relative border-l-4 border-green-600 pl-6">
          {timeline.map((item, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                  {item.year}
                </div>
                <div className="bg-white p-4 shadow rounded-lg flex items-center space-x-4">
                  <img src={item.logo} alt={`${item.company} Logo`} className="w-16 h-auto" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.company}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Startups;
