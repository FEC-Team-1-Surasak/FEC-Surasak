import React from 'react';

const HorizontalIcon = (props) => (
  <div
    className="horizontal-icon"
    onClick={(e) => { props.updateImgIndex(props.index); }}
  >
    <span>{props.currentImgIndex === props.index ? '🟠' : '⚪️'}</span>
  </div>
);

export default HorizontalIcon;
