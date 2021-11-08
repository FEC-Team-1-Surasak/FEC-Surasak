/* eslint-disable react/prop-types */
import React from 'react';

const CharacteristicSlider = ({ characteristic, charObj }) => {
  const defaultCharacteristics = {
    Size: {
      values: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    },
    Width: {
      values: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    },
    Comfort: {
      values: ['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'],
    },
    Quality: {
      values: ['Poor', 'Below Average', 'What I expect', 'Pretty great', 'Perfect'],
    },
    Length: {
      values: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    },
    Fit: {
      values: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly loose', 'Runs loose'],
    },
  };

  console.log('CHAR: ', characteristic);
  console.log('Obj: ', charObj);

  return (
    <div>
      <label htmlFor={characteristic}>{characteristic}</label>
      <input
        className="range-slider"
        name={characteristic}
        alue={charObj.value}
        type="range"
        list="tickmarks"
        min="1"
        max="5"
      />
      <datalist className="range-data" id="tickmarks">
        {
          defaultCharacteristics[characteristic].values.map((value, i) => (
            <option
              label={`${value}`}
              value={`${1 + i}`}
            >
              {value}
            </option>
          ))
        }
      </datalist>
    </div>
  );
};

export default CharacteristicSlider;
