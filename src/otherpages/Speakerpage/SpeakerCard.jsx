import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../components/Image.jsx';
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


function SpeakerCard({ image, name, title, twitter, linkedin, instagram }) {
  return (
    <div className="relative group glass-morphism flex flex-col p-8 justify-center items-center gap-2 font-bold">
      <Image
        src={image}
        alt={name}
        className="rounded-full object-cover aspect-square w-[250px] h-[250px] shadow-md"
      />
      <h1 className="text-lg md:text-2xl text-center">{name}</h1>
      <h2 className="text-sm md:text-lg font-normal text-center">{title}</h2>

      {/* Hover Social Icons */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm hidden group-hover:flex flex-col justify-center items-center gap-4 text-white rounded-lg transition-all duration-300">
        <div className="flex gap-4 text-4xl">
          {twitter && <a href={twitter} target="_blank" rel="noreferrer"><FaSquareXTwitter /></a>}
          {linkedin && <a href={linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
          {instagram && <a href={instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>}
        </div>
      </div>
    </div>
  );
}

SpeakerCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SpeakerCard;
