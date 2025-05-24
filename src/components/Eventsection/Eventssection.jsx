import img1 from "../Eventsection/Ev1.webp";
import img2 from "../Eventsection/Ev2.jpeg";
import img3 from "../Eventsection/Ev3.jpeg";
import { Link } from "react-router-dom";
import FadeUpAnimation from "../../components/FadeUp";

const events = [
  {
    img: img3,
    title: "Innovate-A-Thon",
    subtitle: "Premier Entrepreneurial Fest",
  },
  {
    img: img1,
    title: "E-Summit",
    subtitle: "Cultivate inventive startups",
  },
  {
    img: img2,
    title: "BIT-NISHAN",
    subtitle: "Encourage problem-solving",
  },
];

function Eventsection() {
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
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 lg:space-x-8">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center mb-5 transition ease-in-out hover:scale-105"
            >
              <div className="event-card relative w-64 md:w-72 lg:w-72 rounded-xl overflow-hidden p-1.5 shadow-md transition-transform duration-300 mt-4">
                <img
                  loading="lazy"
                  src={event.img}
                  alt={event.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="event-details absolute flex auto bottom-0 left-0 right-0 bg-white bg-opacity-90 p-5 rounded-t-2xl text-center transition-transform duration-300 opacity-0 hover:opacity-100 translate-y-0">
                  <div className="grid grid-rows-2 gap-2 ms-9">
                    <h2 className="font-medium text-lg mb-0 text-black">
                      {event.title}
                    </h2>
                    <p className="text-sm mb-2 text-gray-600">
                      {event.subtitle}
                    </p>
                  </div>
                </div>
              </div>
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
