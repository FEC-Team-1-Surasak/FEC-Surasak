import React from 'react';

const Nickname = (props) => (
  <div className="your-nickname">
    <h3>What is your nickname?</h3>
    <input onChange={props.nameChange.bind(this)} maxLength="60" placeholder="Example:jackson111" />
    <h5><i>For privacy reasons, do not use your full name or email address</i></h5>
  </div>
);

export default Nickname;