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
import ExpandView from './expandView.jsx';

class IndividualAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasVoted: false,
      helpfulness: this.props.answer.helpfulness,
      IsReport: 'Report',
      reportCount: 0,
      expand: false,
      currselect: '',
      thumbnail: '',
      currId: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.report = this.report.bind(this);
    this.clickPhoto = this.clickPhoto.bind(this);
    this.clickThumbnail = this.clickThumbnail.bind(this);
  }

  // click function to mark answers helpful
  onClick() {
    this.setState({ helpfulness: this.state.helpfulness + 1 });
    this.setState({ hasVoted: true });
    axios.put('/qa/answers/:answer_id/helpful', { answer_id: this.props.answer.answer_id })
      .then(() => {
        console.log('UPDATED THE RECORD');
      })
      .catch((err) => { console.error(err); });
  }

  clickPhoto(e) {
    const curr = this.state.expand;
    this.setState({ expand: !curr });
    this.setState({ currselect: e.target });
  }

  clickThumbnail(e) {
    console.log(e);
    this.setState({thumbnail: e.target });
    this.setState({currselect: e.target});
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
          A:
          {this.props.answer.body}
        </div>
        <div className="image">
          {this.props.answer.photos.map((photo) => (
            <img src={photo.url} width="100" height="50" key={photo.id} onClick={this.clickPhoto} />
          ))}
        </div>

        {this.state.expand
          ? (
            <div className="expand-answer-photo">
              <div className="expand-answer-thumbnail">
                {this.props.answer.photos.map((photo) => (
                  <img src={photo.url} width="100" height="50" key={photo.id} onClick={this.clickThumbnail} />
                ))}
              </div>
              <ExpandView url={this.state.currselect.src} click={this.clickPhoto} />
            </div>
          )
          : null}

        <div className="user-name">
          by user
          {this.props.answer.answerer_name === 'Seller' ? <b>Seller</b> : this.props.answer.answerer_name}
          ,
          {' '}
          {new Date(this.props.answer.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          <span>Helpful?</span>
          {this.state.hasVoted
            ? <span>Marked Yes</span>
            : (
              <span onClick={this.onClick}>
                <u>Yes</u>
                (
                {this.state.helpfulness}
                )
              </span>
            )}
          <span onClick={this.report}><u>{this.state.IsReport}</u></span>
        </div>
      </div>
    );
  }
}

export default IndividualAnswer;
