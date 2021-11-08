/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const CarouselImage = (props) => {
  return <img className="overview-carousel-image" src={props.url} onClick={(e) => props.changeView('expanded')} />;
};

export default CarouselImage;
