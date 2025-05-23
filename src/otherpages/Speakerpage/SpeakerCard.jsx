import React from 'react';
import PropTypes from 'prop-types';

function SpeakerCard({ image, name, title }) {
  return (
    <div className="glass-morphism flex flex-col md:p-16 p-8 justify-center items-center gap-2 font-bold">
      <img src={image} alt={name} className="rounded-full" />
      <h1 className="text-lg md:text-2xl text-center">{name}</h1>
      <h2 className="text-sm md:text-lg font-normal text-center">{title}</h2>
    </div>
  );
}

SpeakerCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SpeakerCard;
