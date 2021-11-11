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
    <div className="sliderbar-container">
      <div>{characteristic}</div>
      <div className="slidecontainer">
        <input type="range" min="0" max="100" value={Math.round((((charObj.value - 1) / (4)) * 100))} className="slider" disabled />
      </div>
      <ul className="slider-label-container">
        <li className="sliderbar-label-left">{defaultCharacteristics[characteristic].values[0]}</li>
        <li className="sliderbar-label-center">{defaultCharacteristics[characteristic].values[1]}</li>
        <li className="sliderbar-label-right">{defaultCharacteristics[characteristic].values[2]}</li>
      </ul>
    </div>
  );
};

export default CharacteristicSlider;
