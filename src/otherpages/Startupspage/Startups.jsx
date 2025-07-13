import React from "react";
import startup1 from "./Startupspic/img1.png";
import startup2 from "./Startupspic/img2.png";
import heroImage from "./Startupspic/startuphome.png";

const Startups = () => {
  const timeline = [
    {
      year: "1958",
      company: "Bhoruka",
      desc: "Bhoruka Power is charting its own pioneering path in the rapidly growing field of renewable energy.",
      logo: "https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752423745/bhoruka-web.jpg_1_mjlmbt.png",
      side: "left",
    },
    {
      year: "1989",
      company: "Aura Inc.",
      desc: "We manufacture instrumentation fittings, valves, and temperature sensor assemblies.",
      logo: "https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752423774/aura-logo_1_wzznqe.png",
      side: "right",
    },
    {
      year: "1995",
      company: "TriVium",
      desc: "A leading provider of smart business productivity solutions for voice and data convergence.",
      logo: "https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752423837/trivium_abixed.png",
      side: "left",
    },
    {
      year: "1999",
      company: "Tanaashi",
      desc: "Tanaashi Group was founded with the vision of providing complete solutions to the industry in the fields of software development.",
      logo: "https://res.cloudinary.com/dmjoxb8pe/image/upload/v1752423846/tanaashi_hnmxnu.png",
      side: "right",
    },
    {
      year: "2000",
      company: "TEJAS Networks",
      desc: "A leading telecom product company for network infrastructure across the globe.",
      logo: tejasLogo,
      side: "left",
    },
    {
      year: "2001",
      company: "Netwoven",
      desc: "Helping businesses embrace digital transformation through scalable cloud solutions.",
      logo: netwovenLogo,
      side: "right",
    },
    {
      year: "2002",
      company: "CRMNEXT",
      desc: "A leading CRM solution that improves customer experience through automation.",
      logo: crmnextLogo,
      side: "left",
    },
     {
      year: "2007",
      company: "Eko",
      desc: "Eko India Financial Services Pvt. Ltd. is an Indian fintech company ,service for SBI,ICICI and Yes bank.",
      logo: ekoLogo,
      side: "right",
    },
    {
      year: "2009",
      company: "DBSync",
      desc: "DBSync is a complete on-demand integration & replication provider that empires companies to connect any combination of SaaS,cloud and on-premise applications together.",
      logo: dbsyncLogo,
      side: "left",
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
       
        <section className="max-w-6xl mx-auto p-8 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-green-600"></div>
       
        {timeline.map((item, index) => (
          <div key={index} className="mb-12 flex flex-col md:flex-row items-center justify-between relative">
            {index % 2 === 0 ? (
              <>
                <div className="md:w-[45%] p-4"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full text-lg font-bold shadow">
                  {item.year}
                </div>
                <div className="md:w-[45%] p-4">
                  <div className="bg-white p-4 shadow rounded-lg">
                    <img src={item.logo} alt={`${item.company} logo`} className="w-24 mb-2" />
                    <h3 className="font-semibold text-lg">{item.company}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="md:w-[45%] p-4">
                  <div className="bg-white p-4 shadow rounded-lg">
                    <img src={item.logo} alt={`${item.company} logo`} className="w-24 mb-2" />
                    <h3 className="font-semibold text-lg">{item.company}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full text-lg font-bold shadow">
                  {item.year}
                </div>
                <div className="md:w-[45%] p-4"></div>
              </>
            )}
          </div>
        ))}
      </section>

    </div>
  );
};

export default Startups;
