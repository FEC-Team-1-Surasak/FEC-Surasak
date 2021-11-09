import React from 'react';

const Body = (props) => (
  <div className="your-question">
    <h3>{props.label === 'question' ? 'Your Question' : 'Your Answer'}</h3>
    <input onChange={() => props.labelChange} maxLength="1000" />
  </div>
);

export default Body;
