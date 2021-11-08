/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const CarouselThumbnail = (props) => (
  <div>
    <img
      className={`overview-carousel-thumbnail${props.currentImgIndex === props.index ? ' selected' : ''}`}
      src={props.url}
      onClick={(e) => { props.selectIndex(props.index); }}
    />
  </div>
);

export default CarouselThumbnail;
