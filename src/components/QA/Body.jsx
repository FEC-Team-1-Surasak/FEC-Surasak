/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

const Body = (props) => (
  <div className="your-question">
    <h3>{props.label === 'question' ? 'Your Question' : 'Your Answer'}</h3>
    <textarea placeholder="Why did you like the product or not?" className="body-input" onChange={props.labelChange.bind(this)} maxLength="1000" />
  </div>
);

export default Body;
