import "./speakercards.css";
import { Link } from "react-router-dom";
import img_1 from "../speakers/karan.png";
import img_2 from "../speakers/amit.png";
import img_3 from "../speakers/aman.png";
import img_4 from "../speakers/ravi.png";
import img_6 from "../speakers/Rishabh.png";

const speakersData = [
  {
    img: img_1,
    alt: "Karan",
    name: "Karan Bajaj",
    desc: "Founder - WhiteHat Jr",
  },
  {
    img: img_2,
    alt: "Amit",
    name: "Amit Choudhary",
    desc: "Founder - Lenskart",
  },
  {
    img: img_3,
    alt: "Aman",
    name: "Aman Dhattarwal",
    desc: "Founder - Apni Kaksha",
  },
  {
    img: img_4,
    alt: "Ravi",
    name: "Ravi K Ranjan",
    desc: "Ex Shark Tank",
  },
  {
    img: img_6,
    alt: "Rishabh",
    name: "Rishabh Jain",
    desc: "Labour Law Advisor",
  },
];

function Speakers() {
  return (
    <>
      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
        <div className="glass-morphic lg:m-20 p-4 lg:p-12 shadow-2xl rounded-2xl">
          <div className="p-4">
            <div className="flex flex-row justify-start items-center">
              <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
              <h1 className="text-[25px] ml-[-25px] font-bold">Speakers</h1>
            </div>
            <div className="mt-6 mb-12">
              <h1 className="text-[35px] font-bold">Some Past Speakers</h1>
            </div>
          </div>
          <div className="flex relative overflow-hidden min-h-[400px] sm:h-auto">
            <div className="scrolling-cards flex space-x-6 animate-scroll1 mr-6 ">
              {speakersData.map((speaker, idx) => (
                <div
                  key={`scroll1-${idx}`}
                  className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end"
                >
                  <img src={speaker.img} alt={speaker.alt} />
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {speaker.name}
                  </h3>
                  <p className="text-center">{speaker.desc}</p>
                </div>
              ))}
            </div>

            <div className="scrolling-cards flex space-x-6 animate-scroll2">
              {speakersData.map((speaker, idx) => (
                <div
                  key={`scroll2-${idx}`}
                  className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end"
                >
                  <img src={speaker.img} alt={speaker.alt} />
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {speaker.name}
                  </h3>
                  <p className="text-center">{speaker.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link spy={true} smooth={true} to="/Speakers">
              <button className="transition ease-in-out hover:scale-110 p-4 rounded-xl bg-[#FED853] font-bold mt-[-50px]">
                Know More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Speakers;
