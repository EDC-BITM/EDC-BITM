import React from "react";
// import { SlCalender } from "react-icons/sl";
// import { FaRegClock } from "react-icons/fa";
// import { ImTarget } from "react-icons/im";
// import { IoCalendarOutline } from "react-icons/io5";
// import { IoTimerOutline } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";
import img1 from '../Eventsection/Ev1.jpeg';
import img2 from '../Eventsection/Ev2.jpeg';
import img3 from '../Eventsection/Ev3.jpeg';
import { Link } from 'react-router-dom';


function Eventsection() {
    return (
        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
            <div className="glass-morphic lg:m-20 m-4 p-4 lg:p-12 shadow-2xl rounded-2xl ">
                <div className="flex flex-row justify-start items-center">
                    <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                    <h1 className="text-[25px] ml-[-30px] font-bold">Events</h1>
                </div>
                <div className="mt-6">
                    <h1 className="text-[25px] sm:text-[35px] font-bold">Our Flagship Events</h1>
                </div>
                <div className="flex flex-col justify-center items-center mt-6">
                    <div className="flex md:flex-row flex-col justify-center items-center mb-4 gap-4 p-4">
                        <div className="flex flex-col justify-center items-center text-center md:p-8 glass-morphism md:w-[30%] w-full p-8 transition ease-in-out hover:scale-105">
                            <div>
                                <img src={img3} alt="" srcset="" height="400px" width="400px"/*className="rounded-lg"*/ />
                                <h1 className="font-bold mt-4 md:text-[25px]">Innovate-A-Thon</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center mt-4">
                                {/* <div className="grid grid-cols-3">
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <IoCalendarOutline />
                                    <h1 className="font-bold">Date</h1>
                                </div>
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <IoTimerOutline />
                                    <h1 className="font-bold">Time</h1>
                                </div>
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <CiLocationOn />
                                    <h1 className="font-bold">Venue</h1>
                                </div>
                            </div> */}
                                <p className="text-[16px]">Premier Entrepreneurial Fest</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center md:p-8 glass-morphism md:w-[30%] w-full p-8 transition ease-in-out hover:scale-105">
                            <div>
                                <img src={img1} alt="" srcset="" height="400px" width="400px"/*className="rounded-full"*/ />
                                <h1 className="font-bold mt-4 md:text-[25px]">E-Summit</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center mt-4">
                                {/* <div className="grid grid-cols-3">
                                {/* <div className="flex md:flex-row flex-col justify-center items-center">
                                    <IoCalendarOutline />
                                    <h1 className="font-bold">Date</h1>
                                </div>
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <IoTimerOutline />
                                    <h1 className="font-bold">Time</h1>
                                </div>
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <CiLocationOn />
                                    <h1 className="font-bold">Venue</h1>
                                </div> }
                            </div> */}
                                <p className="text-[16px]">Cultivate inventive startups</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center md:p-8 glass-morphism md:w-[30%] w-full p-8 transition ease-in-out hover:scale-105">
                            <div>
                                <img src={img2} alt="" srcset="" height="400px" width="400px"/*className="rounded-full"*/ />
                                <h1 className="font-bold mt-4 md:text-[25px]">BIT-NISHAN</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center mt-4">
                                {/* <div className="grid grid-cols-3">
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <IoCalendarOutline />
                                    <h1 className="font-bold">Date</h1>
                                </div>
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <IoTimerOutline />
                                    <h1 className="font-bold">Time</h1>
                                </div>
                                <div className="flex md:flex-row flex-col justify-center items-center">
                                    <CiLocationOn />
                                    <h1 className="font-bold">Venue</h1>
                                </div>
                            </div> */}
                                <p className="text-[16px]">Encourage problem-solving</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-6">
                        <Link spy={true} smooth={true} to="/Events">
                            <button className="transition ease-in-out hover:scale-110 p-4 rounded-xl bg-[#FED853] font-bold mt-[-50px]">Know More</button>                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eventsection