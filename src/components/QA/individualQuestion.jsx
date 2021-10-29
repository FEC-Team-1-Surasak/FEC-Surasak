/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.question.question_helpfulness,
      cnt: 0,
    };
    this.onClick = this.onClick.bind(this);
  }
  // get helpfulness information form api '/qa/questions'
  // data.results.question_helpfulness

  // click functions to update the counts of helpfulness
  onClick() {
    if (this.state.cnt === 1) {
      alert('You have already marked this questions helfpful');
    } else {
      const count = this.state.helpfulness;
      this.setState({ helpfulness: count + 1 });
      this.setState({ cnt: 1 });
      // send a put
      axios.put('/qa/questions/:question_id/helpful', { question_id: this.props.question.question_id })
        .then(() => { console.log('updating the record'); })
        .catch((err) => { console.log('Error'); });
    }
  }

  render() {
    return (
      <div className="question">
        <div className="question-body">
          <b> Q:</b>
          {this.props.question.question_body}
          <span>Helpful?</span>
          <span onClick={this.onClick}>
            Yes(
            {this.state.helpfulness}
            )
          </span>
        </div>
        {/* <AddAnswer /> */}
      </div>

    );
  }
}

export default IndividualQuestion;
