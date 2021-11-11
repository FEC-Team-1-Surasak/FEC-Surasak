/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import Star from './Icons/Star.jsx';

const RatingBar = (props) => {
  const { rating, completed } = props;

  const containerStyles = {
    height: '1em',
    width: '89.5%',
    backgroundColor: '#e0e0de',
    textAlign: 'left',
    display: 'inline-block',
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: 'green',
    borderRadius: 'inherit',
    textAlign: 'right',
    display: 'inline-block',
  };

  return (
    <div>
      <span>
        {`${rating} `}
        <Star color="#ffc110" />
        <span style={{ color: rating === '1' ? 'transparent' : '#ffc110' }}>s </span>
      </span>
      <div style={containerStyles}>
        <div style={fillerStyles} />
      </div>
    </div>
  );
};

export default RatingBar;
