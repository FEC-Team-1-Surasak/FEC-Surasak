/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
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
    this.arrowClick = this.arrowClick.bind(this);
  }

  // click function to mark answers helpful
  onClick() {
    const count = this.state.helpfulness;

    if (this.state.hasVoted === false) {
      console.log('invoking this');
      this.setState({ helpfulness: count + 1 });
      this.setState({ hasVoted: true });
    }

    if (this.state.hasVoted === true) {
      this.setState({ helpfulness: count - 1 });
      this.setState({ hasVoted: false });
    }
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

  // click on thumbnail image to change the expanded photo
  clickThumbnail(e) {
    this.setState({ currselect: e.target });
  }

  // function to find the index of selected images
  findindex(current, photo) {
    for (let i = 0; i < photo.length; i++) {
      if (photo[i].url === (current.src === undefined ? current.url : current.src)) {
        return i;
      }
    }
  }

  // handle arrow click function
  arrowClick(e) {
    const index = this.findindex(this.state.currselect, this.props.answer.photos);
    if (index >= 1 && e.target.innerText === '<') {
      this.setState({ currselect: this.props.answer.photos[index - 1] });
      console.log('current state', this.state.currselect);
    }
    if (index < this.props.answer.photos.length - 1 && e.target.innerText === '>') {
      this.setState({ currselect: this.props.answer.photos[index + 1] });
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
      <div className="individual-answer-list">
        <div className="answer">
          {' '}
          {/* <span className="answer-title">Answer:</span> */}
          <span className="answer-title-body">{this.props.answer.body}</span>
        </div>
        <div className="image">
          {this.props.answer.photos.map((photo) => (
            <img src={photo.url} width="100" height="50" key={photo.id} onClick={this.clickPhoto} />
          ))}
        </div>

        {/* seciton to handle photo expand view */}
        {this.state.expand
          ? (
            <div className="modal-bg" style={{ backgroundColor: 'rgba(0,0,0, 0.85)' }} >
              <div className="modal-shroud">
                <div className="expand-answer-photo">

                  <div className="expand-answer-thumbnail">
                    {this.props.answer.photos.map((photo) => (
                      <img src={photo.url} width="100" height="50" key={photo.id} onClick={this.clickThumbnail} />
                    ))}
                  </div>

                  <div className="expand-view-section">
                    <div className="arrow-L" onClick={this.arrowClick}>{'<'}</div>
                    <ExpandView
                      question={this.props.question}
                      answer={this.props.answer.body}
                      url={this.state.currselect.src === undefined ? this.state.currselect.url
                        : this.state.currselect.src}
                      click={this.clickPhoto}
                      width="300"
                      height="350"
                    />
                    <div className="arrow-R" onClick={this.arrowClick}>{'>'}</div>

                  </div>
                </div>
              </div>
            </div>
          )
          : null}

        <div className="user-name">
          by user
          {this.props.answer.answerer_name === 'Seller' ? <b>Seller</b> : this.props.answer.answerer_name}
          {' '}
          on
          {' '}
          {new Date(this.props.answer.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          {' '}
          <span className="answer-helpful">Helpful?</span>
          {this.state.hasVoted
            ? (
              <span className="answer-helpful-yes" onClick={this.onClick}>
                {' '}
                Voted(
                {this.state.helpfulness}
                )
                {' '}
              </span>
            )
            : (
              <span className="answer-helpful-yes" onClick={this.onClick}>
                {' '}
                <u>Yes</u>
                {' '}
                (
                {this.state.helpfulness}
                )
              </span>
            )}
          <span className="report" onClick={this.report}>
            {' '}
            <u>{this.state.IsReport}</u>
            {' '}
          </span>
        </div>
      </div>
    );
  }
}

export default IndividualAnswer;
