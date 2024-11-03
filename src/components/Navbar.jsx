import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from "../assets/edclogo3d.png";
import AOS from "aos";
import "aos/dist/aos.css";

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
      data-aos="fade-down"
      className="lg:hidden block absolute top-16 left-0 right-0 bg-[#111111] transition-all duration-[5000ms] delay-[150ms] ease-in-out"
    >
      <ul className="text-center text-xl py-10">
        <Link spy={true} smooth={true} to="/" onClick={() => {handleClick(); window.scrollTo(0, 0)}}>
          <li className="my-4 py-4 border-b border-transparent hover:bg-transparent hover:rounded transition">Home</li>
        </Link>
        <Link spy={true} smooth={true} to="/Events" onClick={() => {handleClick(); window.scrollTo(0, 0)}}>
          <li className="my-4 py-4 border-b border-transparent hover:bg-transparent hover:rounded transition">Events</li>
        </Link>
        <Link spy={true} smooth={true} to="/Speakers" onClick={() => {handleClick(); window.scrollTo(0, 0)}}>
          <li className="my-4 py-4 border-b border-transparent hover:bg-transparent hover:rounded transition">Speakers</li>
        </Link>
        <Link spy={true} smooth={true} to="/Team" onClick={() => {handleClick(); window.scrollTo(0, 0)}}>
          <li className="my-4 py-4 border-b border-transparent hover:bg-transparent hover:rounded transition">Team</li>
        </Link>
        <Link spy={true} smooth={true} to="/App" onClick={() => {handleClick(); window.scrollTo(0, 0)}}>
          <li className="my-4 py-4 border-b border-transparent hover:bg-transparent hover:rounded transition">App</li>
        </Link>
      </ul>
    </div>
  );

  const navbarStyles = `
  .nav-btn {
    display: none;
  }

  @media (max-width: 768px) {
    .nav-btn {
      display: block;
    }
  }
`;
  return (
    <div className="h-10vh w-screen">
      <style>{navbarStyles}</style>
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
          <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
            <div className="flex-10">
              <ul className="flex gap-4 lg:gap-8 text-[16px] lg:text-[18px]">
                <Link
                  to="/"
                  className={`hover:text-yellow-400 transition cursor-pointer ${
                    location.pathname === '/' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <li>Home</li>
                </Link>
                <Link
                  to="/Events"
                  className={`hover:text-yellow-400 transition cursor-pointer ${
                    location.pathname === '/Events' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <li>Events</li>
                </Link>
                <Link
                  to="/Speakers"
                  className={`hover:text-yellow-400 transition cursor-pointer ${
                    location.pathname === '/Speakers' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <li>Speakers</li>
                </Link>
                <Link
                  to="/Team"
                  className={`hover:text-yellow-400 transition cursor-pointer ${
                    location.pathname === '/Team' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <li>Team</li>
                </Link>
                <Link
                  to="/App"
                  className={`hover:text-yellow-400 transition cursor-pointer ${
                    location.pathname === '/App' ? 'text-yellow-400' : ''
                  }`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <li>App</li>
                </Link>
              </ul>
            </div>
          </div>
          <div>{click && content}</div>
          <button className="nav-btn" onClick={handleClick}>
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