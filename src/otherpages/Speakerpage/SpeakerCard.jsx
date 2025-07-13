import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import CldImage from "./CldImage"; 

function SpeakerCard({ publicId, name, title, twitter, linkedin, instagram }) {
  return (
    <div className="relative group flex flex-col items-center gap-2 glass-morphism p-6">
      {/* Speaker Image */}
      <CldImage
        src={publicId}
        alt={name}
        width={300}
        height={300}
        className="rounded-full object-cover aspect-square shadow-md"
      />

      {/* Name and Title */}
      <h1 className="text-lg md:text-xl font-bold text-center mt-2">{name}</h1>
      <p className="text-sm md:text-base text-center">{title}</p>

      {/* Hover Socials */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl hidden group-hover:flex flex-col justify-center items-center transition-all duration-300 ease-in-out">
        <div className="flex gap-4 text-white text-4xl">
          {twitter && (
            <a href={twitter} target="_blank" rel="noreferrer">
              <FaSquareXTwitter />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpeakerCard;
