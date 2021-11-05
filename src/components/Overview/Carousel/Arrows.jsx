/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Arrows = (props) => {
  const arrowStyleRight = {
    position: 'absolute',
    'z-index': 10,
    right: '20px',
    top: '225px',
    color: '#FFFAFA',
    'font-weight': 'bold',
    'text-shadow': 'black 0.1em 0.1em 0.2em',
    'font-size': '18px',
  };

  const arrowStyleLeft = {
    position: 'absolute',
    'z-index': 10,
    left: '100px',
    top: '225px',
    color: '#FFFAFA',
    'font-weight': 'bold',
    'text-shadow': 'black 0.1em 0.1em 0.2em',
    'font-size': '18px',
  };

  if (props.direction === 'right') {
    return (
      <div style={arrowStyleRight} onClick={props.next}>
        {'>'}
      </div>
    );
  }
  if (props.direction === 'left') {
    return (
      <div style={arrowStyleLeft} onClick={props.previous}>
        {'<'}
      </div>
    );
  }
};

export default Arrows;
