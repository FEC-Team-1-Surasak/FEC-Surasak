/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import AddAnswer from './AddAnswer.jsx';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
    };
  }
  // get helpfulness information form api '/qa/questions'
  // data.results.question_helpfulness

  render() {
    return (
      <div className="question">
        <div>
        <b> Q:</b>
        {this.props.question.question_body}
        Helpful?
        </div>
        {/* <AddAnswer /> */}
      </div>

    );
  }
}

export default IndividualQuestion;
