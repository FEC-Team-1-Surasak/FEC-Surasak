/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

class IndividualAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cnt: 0,
      helpfulness: this.props.answer.helpfulness,
      IsReport: 'Report',
      reportCount: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.report = this.report.bind(this);
  }

  // click function to mark answers helpful
  onClick() {
    if (this.state.cnt === 1) {
      alert('You have already marked this answer helfpful');
    } else {
      this.setState({ helpfulness: this.state.helpfulness + 1 });
      this.setState({ cnt: 1 });
      // send a put
      axios.put('/qa/answers/:answer_id/helpful', { answer_id: this.props.answer.answer_id })
        .then(() => {
          console.log('UPDATED THE RECORD');
        })
        .catch((err) => { console.error(err); });
    }
  }

  // report an answer
  report() {
    if (this.state.reportCount === 1) {
      alert('You have already reported this answer');
    } else {
      this.setState({ reportCount: 1 });
      this.setState({ IsReport: 'Reported' });
      // send a put
      axios.put('/qa/answers/:answer_id/report', { answer_id: this.props.answer.answer_id })
        .then(() => {
          console.log('UPDATED THE RECORD');
        })
        .catch((err) => { console.error(err); });
    }
  }

  render() {
    return (
      <div>
        <div className="answer">
          {' '}
          <b>A:</b>
          {this.props.answer.body}
        </div>
        <div className="image">
          {this.props.answer.photos.map((photo) => (
            <img src={photo.url} width="100" height="50" />
          ))}
        </div>
        <div className="user-name">
          by user
          {this.props.answer.answerer_name === 'Seller' ? <b>Seller</b> : this.props.answer.answerer_name}
          ,
          {' '}
          {new Date(this.props.answer.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          <span>Helpful?</span>
          <span onClick={this.onClick}>
            <u>Yes</u>
            (
            {this.state.helpfulness}
            )
          </span>
          <span onClick={this.report}><u>{this.state.IsReport}</u></span>
        </div>
      </div>
    );
  }
}

export default IndividualAnswer;
