import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from "/edclogo3d.png";
import AOS from "aos";
import "aos/dist/aos.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/Events", label: "Events" },
  { to: "/Speakers", label: "Speakers" },
  { to: "/Team", label: "Team" },
  { to: "/App", label: "App" },
];

const NavBar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [click, setClick] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();

  const content = (
    <div
      className={`
        lg:hidden absolute top-20 left-0 right-0 bg-[#111111] overflow-hidden
        transition-all duration-300 ease-in-out
        ${click ? 'h-100 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
      `}
      style={{
        zIndex: 49,
      }}
    >
      <ul className="text-center text-xl py-10">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            spy={true}
            smooth={true}
            to={link.to}
            onClick={() => {
              handleClick();
              window.scrollTo(0, 0);
            }}
          >
            <li className="my-4 py-4 border-b border-transparent hover:bg-transparent hover:rounded transition">
              {link.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-10vh w-screen">
      <nav className="m-0 p-0">
        <div
          className={`h-9vh flex justify-between z-50 text-white lg:py-1 px-4 lg:px-20 py-2 fixed top-0 left-0 w-screen transition ${
            scroll ? 'bg-[#111111]' : 'bg-transparent'
          }`}
          style={{
            ...(scroll
              ? { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }
              : {}),
          }}
        >
          <div className="flex items-center flex-1 mt-2 mb-2">
            <Link
              to="/"
              className="lg:text-[18px] font-bold flex flex-row justify-center items-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img src={logo} alt="" className="w-12 h-12" />
              <span className="hidden sm:block font-medium text-[15px]">
                Entrepreneurship <br />
                Development Cell
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end font-normal">
            <div className="flex-10">
              <ul className="flex gap-4 lg:gap-8 text-[16px] lg:text-[18px]">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`hover:text-yellow-400 transition cursor-pointer ${
                      location.pathname === link.to ? 'text-yellow-400' : ''
                    }`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <li>{link.label}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          {content}
          <button className="block md:hidden" onClick={handleClick}>
            {click ? (
              <FaTimes className="icon" style={{ fontSize: '3rem' }} />
            ) : (
              <IoMenu className="icon" style={{ fontSize: '3rem' }} />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;