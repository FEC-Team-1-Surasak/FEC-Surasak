/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Arrows = (props) => {
  return (<div className={`arrow${props.direction}`} onClick={props.onClick}>
    {props.arrow}
  </div>);
};

export default Arrows;
