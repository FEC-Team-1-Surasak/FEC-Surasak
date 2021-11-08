import React from 'react';

const ExpandView = (props) => (
  <div className="expandlist">
    <div className="expand-photo">
     <img src={props.url} alt="" onClick={props.click} width="400" height="350" />
    </div>
    <div className="expand-photo-question">
      <b>Question:{props.question}</b>
      <div className="expand-photo-answer">Answer:{props.answer}</div>
    </div>

  </div>
);

export default ExpandView;
