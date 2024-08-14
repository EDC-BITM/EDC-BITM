import React from "react";
import "./speakercards.css";
import {Link} from 'react-router-dom';
import img_1 from "../speakers/karan.png";
import img_2 from "../speakers/amit.png";
import img_3 from "../speakers/aman.png";
import img_4 from "../speakers/ravi.png";
import img_5 from "../speakers/pawan.png";
import img_6 from "../speakers/Rishabh.png";

function Speakers() {
    return (
      <>
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
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_1} alt="Karan" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Karan Bajaj</h3>
                  <p className="text-center">Founder - WhiteHat Jr</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_2} alt="amit" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Amit Choudhary</h3>
                  <p className="text-center">Founder - Lenskart</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_3} alt="aman" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Aman Dhattarwal</h3>
                  <p className="text-center">Founder - Apni Kaksha</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_4} alt="ravi" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Ravi K Ranjan</h3>
                  <p className="text-center">Ex Shark Tank</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_6} alt="Rishabh" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Rishabh Jain</h3>
                  <p className="text-center">Labour Law Advisor</p>
                </div>
              </div>

              <div className="scrolling-cards flex space-x-6 animate-scroll2">
              <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
              <img src={img_1} alt="Karan" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Karan Bajaj</h3>
                  <p className="text-center">Founder - WhiteHat Jr</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_2} alt="amit" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Amit Choudhary</h3>
                  <p className="text-center">Founder - Lenskart</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_3} alt="aman" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Aman Dhattarwal</h3>
                  <p className="text-center">Founder - Apni Kaksha</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_4} alt="ravi" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Ravi K Ranjan</h3>
                  <p className="text-center">Ex Shark Tank</p>
                </div>
                <div className="card w-[275px] sm:w-[300px] h-[275px] sm:h-[275px] p-2 sm:p-4 bg-white bg-opacity-50 rounded-lg shadow-xl flex flex-col justify-end">
                <img src={img_6} alt="Rishabh" />
                  <h3 className="text-xl font-semibold mb-2 text-center">Rishabh Jain</h3>
                  <p className="text-center">Labour Law Advisor</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <Link spy={true} smooth={true} to="/Speakers">
              <button className="p-4 rounded-xl bg-[#FED853] font-bold mt-[-50px]">Know More</button>
              </Link>
            </div>
          </div>
      </>
    );
}

export default Speakers
