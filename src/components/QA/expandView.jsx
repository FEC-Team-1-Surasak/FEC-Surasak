import React from 'react';

const ExpandView = (props) => (
  <div className="expandlist">
    <div className="expand-photo" role="listbox">
     <img src={props.url} alt="" onClick={props.click} width="400" height="350" />
    </div>
    <div className="expand-photo-question">
      <b>Q:{props.question}</b>
      <div>A:{props.answer}</div>
    </div>

  </div>
);

export default ExpandView;
