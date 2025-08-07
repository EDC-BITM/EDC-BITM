import React, { useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import IATBulb from "../assets/IATBulb.svg?react";

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (recipientName, recipientEmail) => {
    const message = prompt(`Send a message to ${recipientName}:`);
    if (!message || !message.trim()) return;

    setLoading(true);

    const serviceConfig = {
      service_ID: "service_okd22ng",
      temp_ID: "template_5nv8jld",
      user_ID: "2APikPfV0dHkUmski",
    };

    emailjs
      .send(
        serviceConfig.service_ID,
        serviceConfig.temp_ID,
        {
          from_name: "Website Visitor",
          from_email: "no-reply@edcbitmesra.com",
          to_name: recipientName,
          to_email: recipientEmail, // Optional: if your template supports dynamic to_email
          message: message.trim(),
        },
        serviceConfig.user_ID,
      )
      .then((r) => alert(`Message sent to ${recipientName}`))
      .catch((error) => alert("Error sending message"))
      .finally(() => setLoading(false));
  };

  return (
    <footer className="bg-gradient-to-b from-[#0F0F1B] to-black text-gray-400 px-6 md:px-20 py-16 font-hanken">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <IATBulb className="w-12 h-12" />
              <h2 className="text-white font-bold">Innovate-A-Thon</h2>
            </div>

            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.instagram.com/edcbitmesra/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-3xl hover:text-white transition" />
              </a>
              <a
                href="https://www.linkedin.com/company/edcbitmesra/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-3xl hover:text-white transition" />
              </a>
            </div>

            <div className="pt-8 text-sm leading-relaxed text-gray-400">
              <p>
                Innovate-A-Thon is East India's biggest hackathon, fostering
                innovation and entrepreneurship by bringing together brilliant
                minds from across the country.
              </p>
            </div>
          </div>
        </div>

        {/* Official */}
        <div>
          <h4 className="text-white font-medium mb-4">For Official</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                className="hover:text-white"
                disabled={loading}
                onClick={() =>
                  handleSendMessage("President", "president.edc@bitmesra.ac.in")
                }
              >
                President
              </button>
            </li>
            <li>
              <button
                className="hover:text-white"
                disabled={loading}
                onClick={() =>
                  handleSendMessage("EDC Team", "team.edc@bitmesra.ac.in")
                }
              >
                EDC Team
              </button>
            </li>
          </ul>
        </div>

        {/* Queries */}
        <div>
          <h4 className="text-white font-medium mb-4">For Queries</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li>
              <button
                className="hover:text-white"
                disabled={loading}
                onClick={() =>
                  handleSendMessage(
                    "Abhinav Kumar Choudhary",
                    "btech10139.23@bitmesra.ac.in"
                  )
                }
              >
                Abhinav Kumar Choudhary
              </button>
            </li>
            <li>
              <button
                className="hover:text-white"
                disabled={loading}
                onClick={() =>
                  handleSendMessage(
                    "Naveen Modi",
                    "btech11011.23@bitmesra.ac.in"
                  )
                }
              >
                Naveen Modi
              </button>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://drive.google.com/file/u/1/d/1xbFGbUhj8ehHBTQtbBcJH0BjUJSsIke1/view?usp=sharing" className="hover:text-white">
                Brochure
              </a>
            </li>
            <li>
              <a
                href="https://unstop.com/p/innovate-a-thon-30-bit-mesra-ranchi-1529762"
                className="hover:text-white"
              >
                Unstop
              </a>
            </li>
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
