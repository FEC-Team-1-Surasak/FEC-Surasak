import React from 'react';
import HorizontalIcon from './HorizontalIcon.jsx';

const HorizontalThumbnail = (props) => {
  const photos = props.currentStyle.photos;
  return (
    <div className="horizontal-thumbnail">
      {photos.map((photo, i) => {
        return (
          <HorizontalIcon
            index={i}
            updateImgIndex={props.updateImgIndex}
            currentImgIndex={props.currentImgIndex}
          />
        );
      })}
    </div>
  );
};

export default HorizontalThumbnail;
