import React from 'react';

const CarouselImage = (props) => {
  const styles = {
    'max-width': '100%',
    'max-height': '100%',
    'object-fit': 'cover',
  };

  return (
      <img style={styles} src={props.url} />
  );
};

export default CarouselImage;
