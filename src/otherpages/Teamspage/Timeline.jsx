import React, { useState, useEffect, useRef } from "react";
import edclogo from "/edclogo3d.png";
import "../Teamspage/timeline.css";
import ujjwal from "/ujjwal.png";
import pranit from "/Pranit 23-24.jpeg";
import saumya from "/Saumya Agarwal 22-23.jpeg";
import sarwadi from "/Sarwadi.jpeg";
import utkarsh from "/utkarsh mishra 20-21.jpeg";
import rahul from "/Rahul thakur 19-20.jpeg";

const presidents = [
  {
    name: "Ujjwal Aman",
    tenure: "2024-2025",
    image: ujjwal,
  },
  {
    name: "Pranit",
    tenure: "2023-2024",
    image: pranit,
  },
  {
    name: "Saumya Agarwal",
    tenure: "2022-2023",
    image: saumya,
  },
  {
    name: "Sarwadi Satank",
    tenure: "2021-2022",
    image: sarwadi,
  },
  {
    name: "Utkarsh Mishra",
    tenure: "2020-2021",
    image: utkarsh,
  },
  {
    name: "Rahul Thakur",
    tenure: "2019-2020",
    image: rahul,
  },
];

function Timeline() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, [hasAnimated]);

  return (
      <>
        <div className="p-1">
          <h3 className="text-xl font-semibold ml-7 mb-4 mt-8">
            <span className="bg-yellow-300 pt-2 pb-2 pl-4">Ha</span>ll of Fame
          </h3>
          <h2 className="text-2xl font-bold ml-7 mb-4 hidden mt-7 ">
            Previous Presidents
          </h2>
        </div>
        <div className="teamstimeee" ref={timelineRef}>
          <div className="teamstimeline">
            {presidents.map((president, index) => (
              <div
                key={index}
                className={`teamscontainer ${
                  hasAnimated
                    ? index % 2 === 0
                      ? "teamsleft-container"
                      : "teamsright-container"
                    : "opacity-0"
                }`}
              >
                <img
                  src={edclogo}
                  alt="EDC Logo"
                  className={index % 2 !== 0 && hasAnimated ? "img111" : ""}
                />
                <div>
                  <div class="teamstext-box">
                    <div
                      className="sm:hidden bg-cover bg-center h-24 w-24 relative z-100 mr-20 ml-8 border border-black rounded-md hidden md:block lg:block xl:block"
                      style={{ backgroundImage: `url(${president.image})` }}
                    >
                      {/* You can add any content here */}
                    </div>
                    <div>
                      <h2>EDC President</h2>
                      <small>{president.tenure}</small>
                      <p>{president.name}</p>
                      <span
                        className={
                          hasAnimated
                            ? index % 2 === 0
                              ? "left-container-arrow"
                              : "right-container-arrow"
                            : ""
                        }
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Timeline;
