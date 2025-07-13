import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/edclogo3d.png";
import emailjs from "@emailjs/browser";
import {
  FaArrowCircleRight,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#FED853] transition-colors"
  >
    <Icon className="w-8 h-8" />
  </a>
);

const ContactLink = ({ email, label }) => (
  <a href={`mailto:${email}`} className="block mb-2">
    <p className="hover:text-yellow-400 text-xs text-[#B6B6B6] transition-colors">
      {label}
    </p>
  </a>
);

const ContactSection = ({ title, contacts }) => (
  <div className="space-y-2">
    <h6 className="font-semibold mb-3">{title}</h6>
    {contacts.map(({ email, label }) => (
      <ContactLink key={email} email={email} label={label} />
    ))}
  </div>
);

const Footer = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

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
          to_name: "TEAM EDC",
          message: message,
        },
        serviceConfig.user_ID
      )
      .then((r) => console.log("Message sent successfully", r))
      .catch((error) => console.error("Error sending message:", error))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setMessage("");
        }, 1000);
      });
  };

  const contactSections = {
    official: {
      title: "For Official",
      contacts: [
        { email: "president.edc@bitmesra.ac.in", label: "President" },
        { email: "team.edc@bitmesra.ac.in", label: "EDC Team" },
      ],
    },
    queries: {
      title: "For Queries",
      contacts: [
        {
          email: "btech10139.23@bitmesra.ac.in",
          label: "Abhinav Kumar Choudhary",
        },
        { email: "btech11011.23@bitmesra.ac.in", label: "Naveen Modi" },
      ],
    },
    enquiries: {
      title: "For Enquiries",
      contacts: [
        { email: "imh10062.23@bitmesra.ac.in", label: "Anuj Nayak" },
        { email: "btech10991.23@bitmesra.ac.in", label: "Rishi Agarwal" },
        { email: "btech10851.23@bitmesra.ac.in", label: "Ashish Kumar" },
      ],
    },
  };

  return (
    <footer className="bg-black w-full text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8">
          {/* Column 1: Logo and Newsletter */}
          <div className="space-y-6 lg:pr-16">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img src={logo} alt="EDC Logo" className="w-12 h-12" />
              <span className="text-white text-[15px]">
                Entrepreneurship <br />
                Development Cell
              </span>
            </Link>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex h-12 text-black rounded-full overflow-hidden">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send us a message..."
                  required
                  className="flex-1 px-4 outline-none"
                  maxLength={200}
                />
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="bg-white px-4 flex items-center hover:bg-gray-100 transition-colors disabled:opacity-80"
                >
                  <FaArrowCircleRight className="text-black text-2xl" />
                </button>
              </div>
            </form>

            <div className="flex gap-4">
              <SocialLink
                href="https://www.instagram.com/edcbitmesra"
                icon={FaInstagram}
              />
              <SocialLink
                href="https://www.facebook.com/edcbitmesra"
                icon={FaFacebook}
              />
              <SocialLink
                href="https://www.linkedin.com/company/edcbitmesra/"
                icon={FaLinkedinIn}
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 lg:pl-28">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="space-y-2">
              <ContactLink email="drie@bitmesra.ac.in" label="Dean of RIE" />
              <ContactLink
                email="vishalhshah@bitmesra.ac.in"
                label="Faculty Advisor"
              />
            </div>
          </div>

          {/* Column 3: Contact Us with nested grid */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContactSection {...contactSections.official} />
              <ContactSection {...contactSections.queries} />
              <ContactSection {...contactSections.enquiries} />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          <p>
            ©{new Date().getFullYear()} EDC, BIT Mesra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
