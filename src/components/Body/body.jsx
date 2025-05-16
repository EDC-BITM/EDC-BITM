import React from "react";
import "../Body/body.css";
import blob from "/blobs.png";
import blobR from "/blobR.png";
import { Link } from "react-scroll";
import { useState } from "react";

function Body() {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div className="b">
      <div className="b-body">
        <div className="heading">
          <h1 className="h1 text-4xl md:text-5xl">
            <span>Igniting the innovation</span>
            <br />
            <span>within upcoming ground breakers.</span>
          </h1>
        </div>
        <div className="btn h-auto">
          <div className="flex justify-center items-center">
            <button
              className="button hover:scale-105 transition ease-in-out"
              onMouseEnter={() => setClick(true)}
              onMouseLeave={() => setClick(false)}
            >
              <Link
                to="our_stats"
                smooth={true}
                duration={500}
                offset={-70}
                className="outline-button"
                onClick={handleClick}
              >
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
      <img src={blob} className="blob1" />
      <img src={blob} className="blob2" />
      <img src={blobR} className="blob3" />
      <img src={blob} className="blob4" />
      <img src={blobR} className="blob5" />
      <img src={blobR} className="blob6" />
    </div>
  );
}

export default Body;
