import React from 'react';

const CarouselImage = (props) => {
  return <img className="overview-carousel-image" src={props.url} onClick={(e) => props.changeView('expanded')} />;
};

export default CarouselImage;
