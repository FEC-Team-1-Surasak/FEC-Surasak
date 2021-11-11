/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

const ExpandView = (props) => (
  <div className="expandlist">
    <div className="expand-photo">
      <img src={props.url} alt="" onClick={props.click} />
    </div>
  </div>
);

export default ExpandView;
