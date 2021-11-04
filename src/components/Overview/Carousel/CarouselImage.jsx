import React from 'react';

const CarouselImage = (props) => {
  const styles = {
    backgroundImage: `url(${props.url})`,
    backgroundSize: 'cover',
    backgroundPostition: 'center',
    width: '50%',
    height: 'auto',
  };

  return (
    <div className="carousel-container">
      <img style={styles} src={props.url} />
    </div>
  );
};

export default CarouselImage;
