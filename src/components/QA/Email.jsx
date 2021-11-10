/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

const Email = (props) => {
  const { emailChange } = props;
  return(
    <div className="your-email">
      <h3>Your email</h3>
      <input className="email-input" placeholder="username@gmail.com" onChange={props.emailChange.bind(this)} maxLength="60" />
      <h5><i>For authentication reasons, you will not be emailed</i></h5>
    </div>
  )
};

export default Email;
