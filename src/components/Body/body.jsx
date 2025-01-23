import React from 'react'
import "../Body/body.css";
import blob from "../../assets/blobs.png"
import blobR from "../../assets/blobR.png"
import Esummitlogoblack from "../../components/Body/Esummitlogoblack.png"
import Esummitlogowhite from "../../components/Body/Esummitlogowhite.png"
import { Link } from 'react-scroll';
import { useState } from 'react';

function Body() {
  const [click,setClick] = useState(false)
    const handleClick = () => {
        setClick(!click)
    }
  return (
    <div className='b'>
      <div className='b-body'>
        <div className="heading">
          <h1 className='h1 text-4xl md:text-5xl'>
            <span>Igniting the innovation</span><br />
            <span>within upcoming ground breakers.</span>
          </h1>
        </div>
        <div className="btn w-80 h-auto">
          <a href="https://esummit.edcbitmesra.in" target="_blank" rel="noreferrer">
            <button 
              className='button hover:scale-110 transition ease-in-out'
              onMouseEnter={() => setClick(true)}
              onMouseLeave={() => setClick(false)}
            >
              <img src={click ? Esummitlogoblack : Esummitlogowhite} alt="E-Summit Logo" />
            </button>
          </a>
        </div>
      </div>
      <img src={blob} className="blob1" />
      <img src={blob} className="blob2" />
      <img src={blobR} className="blob3" />
      <img src={blob} className="blob4" />
      <img src={blobR} className="blob5" />
      <img src={blobR} className="blob6" />
    </div>
  )
 }

export default Body;