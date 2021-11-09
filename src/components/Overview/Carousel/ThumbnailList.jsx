/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import React from 'react';
import CarouselThumbnail from './CarouselThumbnail.jsx';

const ThumbnailList = (props) => {
  const thumbnails = props.currentStyle.photos;
  return (
    <div className="overview-thumbnail-list">
      {thumbnails.map((thumbnail, i) => {
        return (
          <CarouselThumbnail
            url={thumbnail.url}
            currentImgIndex={props.currentImgIndex}
            selectIndex={props.selectIndex}
            index={i}
          />
        );
      })}
    </div>
  );
};

export default ThumbnailList;
