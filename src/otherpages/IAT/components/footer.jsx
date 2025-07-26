import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from '../SquareIATLogo.png'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0F0F1B] to-black text-gray-400 px-6 md:px-20 py-16 font-hanken">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

        
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <h2 className="text-white font-medium">Innovate-A-Thon</h2>
            </div>

            <div className="flex space-x-4 mt-4">
              <FaInstagram className="text-xl hover:text-white transition" />
              <FaLinkedin className="text-xl hover:text-white transition" />
            </div>

            
            <div className="pt-8">
              <h2 className="text-white font-medium text-lg mb-2 font-hanken">
                Have Questions?
              </h2>
              <form className="flex items-center gap-0 mt-2">
                <input
                  type="email"
                  placeholder="Send us a message"
                  className="w-[18rem] md:w-[20rem] bg-transparent border border-gray-600 text-sm px-3 py-2 rounded-l-md focus:outline-none focus:border-white placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="bg-white text-black text-sm font-medium px-4 py-2 rounded-r-md hover:bg-gray-200"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>

        
        <div>
          <h4 className="text-white font-medium mb-4">For Official</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">President</a></li>
            <li><a href="#" className="hover:text-white">EDC Team</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-white font-medium mb-4">For Queries</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="#" className="hover:text-white">Abhinav Kumar Choudhary</a></li>
            <li><a href="#" className="hover:text-white">Naveen Modi</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-white font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Brochure</a></li>
            <li><a href="#" className="hover:text-white">Unstop</a></li>
            <li><a href="#" className="hover:text-white">Devfolio</a></li>
          </ul>
        </div>
      </div>

      
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        ©2025 EDC, BIT Mesra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
