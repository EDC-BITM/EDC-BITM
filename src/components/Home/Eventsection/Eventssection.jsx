import CldImageData from "@/data/CldImage.json";
import CldImage from "@/components/Images/CldImage";
import { Link } from "react-router-dom";
import FadeUpAnimation from "@animations/FadeUp.jsx";
import FlipCard from "./FlipCard.jsx";

{/*removed old local upload of flagship events*/}

function Eventsection() {

  {/*upload via cloud*/}
  const events = CldImageData.Home.flagshipEvents;
    
  return (
    <FadeUpAnimation>
      <div className="glass-morphic lg:m-20 m-4 p-4 lg:p-12 shadow-2xl rounded-2xl ">
        <div className="flex flex-row justify-start items-center">
          <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
          <h1 className="text-[25px] ml-[-30px] font-bold">Events</h1>
        </div>
        <div className="mt-6">
          <h1 className="text-[25px] sm:text-[35px] font-bold">
            Our Flagship Events
          </h1>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-6 md:mt-12 lg:gap-x-16">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center mb-5 transition ease-in-out hover:scale-105"
            >
              <FlipCard
                ariaLabel={`${event.title} event details`}
                axis="y"
                back={
                  <div
                    className={`flex h-full flex-col items-center justify-center gap-4 p-6 text-center text-gray-900 ${
                      event.title === "Innovate-A-Thon"
                        ? "bg-sky-100"
                        : event.title === "E-Summit"
                          ? "bg-purple-100"
                          : "bg-gray-200"
                    }`}
                  >
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                    {event.description ? (
                      <p className="text-sm text-gray-600">{event.description}</p>
                    ) : null}
                  </div>
                }
                front={
                  <CldImage
                    src={event.publicId}
                    alt={event.title}
                    width={750}
                    height={1050}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                }
                height={350}
                radius={16}
                width={250}
                background="#ffffff"
                color="#171923"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
          <Link spy={true} smooth={true} to="/Events">
            <button className="transition ease-in-out hover:scale-110 p-4 rounded-xl bg-[#FED853] font-bold mt-[-50px]">
              Know More
            </button>
          </Link>
        </div>
      </div>
    </FadeUpAnimation>
  );
}

export default Eventsection;
