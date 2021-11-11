/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Thumbnail = (props) => {
  if (props.currentStyle === props.style) {
    return (
      <div className="selected-thumbnail-container">
        <img
          className="default-thumbnail"
          src={props.style.photos[0].thumbnail_url}
          onClick={() => props.updateStyle(props.style)}
        />
        <div className="checkmark-overlay">✔️</div>
      </div>
    );
  }
  return (
    <img
      className="default-thumbnail"
      src={props.style.photos[0].thumbnail_url}
      onClick={() => props.updateStyle(props.style)}
    />
  );
};

export default Thumbnail;
