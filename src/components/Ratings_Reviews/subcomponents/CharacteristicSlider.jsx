/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const CharacteristicSlider = ({ characteristic, charObj }) => {
  const defaultCharacteristics = {
    Size: {
      values: ['Too small', 'Perfect', 'Too wide'],
    },
    Width: {
      values: ['Too narrow', 'Perfect', 'Too wide'],
    },
    Comfort: {
      values: ['Uncomfortable', 'OK', 'Perfect'],
    },
    Quality: {
      values: ['Poor', 'What I expect', 'Perfect'],
    },
    Length: {
      values: ['Runs short', 'Perfect', 'Runs long'],
    },
    Fit: {
      values: ['Runs tight', 'Perfect', 'Runs loose'],
    },
  };

  if (charObj.value === null) {
    return null;
  }
  return (
    <div className="slider-container">
      <span className="slider-name">{characteristic}</span>
      <br />
      <div className="slider-marker" style={{ left: `${Math.round((((charObj.value - 1) / (4)) * 250) - 8)}px` }} />
      <div className="sliderbar-fragment" />
      <div className="sliderbar-fragment" />
      <div className="sliderbar-fragment" />
      <ul className="slider-label-container">
        <li className="sliderbar-label">{defaultCharacteristics[characteristic].values[0]}</li>
        <li className="sliderbar-label">{defaultCharacteristics[characteristic].values[1]}</li>
        <li className="sliderbar-label">{defaultCharacteristics[characteristic].values[2]}</li>
      </ul>
    </div>
  );
};

export default CharacteristicSlider;
