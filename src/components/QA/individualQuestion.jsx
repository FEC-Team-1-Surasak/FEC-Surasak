/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-danger */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
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
import Answer from './Answer.jsx';
import AnswerModal from './AnswerModal.jsx';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.question.question_helpfulness,
      cnt: 0,
      answers: [],
      modal: false,
      hasVoted: false,
    };
    this.onClick = this.onClick.bind(this);
    this.highlight = this.highlight.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // click functions to update the counts of helpfulness
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

    // send a put
    axios.put('/qa/questions/:question_id/helpful', { question_id: this.props.question.question_id })
      .then(() => { console.log('updating the record'); })
      .catch((err) => { console.log('Error'); });
    // }
  }

  findandReplace(string, term) {
    const index = string.toLowerCase().indexOf(term.toLowerCase());
    if (index !== -1) {
      const regex = new RegExp(term, 'gi');
      const text = string.replace(regex, '<mark class="highlight">$&</mark>');
      return <span dangerouslySetInnerHTML={{ __html: `${text} ` }} />;
    }
    return string;
  }

  // highklight the search term
  highlight(term) {
    if (term !== '') {
      return (
        <div>
          {this.findandReplace(this.props.question.question_body, term)}
        </div>
      );
    }
    return (
      <span>
        {this.props.question.question_body}
      </span>
    );
  }

  showModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false });
  }

  // render body
  render() {
    return (
      <div className="question">
        <div className="question-body">
          <span className="title">
            <b> Question:</b>
          </span>
          <span className="title-body"><b>{this.highlight(this.props.term)}</b></span>
          {' '}
          <div className="helpful">
            {' '}
            Helpful?
            {' '}
            {this.state.hasVoted === true
              ? (
                <span className="helpful-yes" onClick={this.onClick}>
                  Voted(
                  {this.state.helpfulness}
                  )
                </span>

              )
              : (
                <span className="helpful-yes" onClick={this.onClick}>
                  Yes(
                  {this.state.helpfulness}
                  )
                </span>

              )}
          </div>

          <span className="add-answer" onClick={this.showModal}>
            <u>Add Answer</u>
          </span>
          {this.state.modal ? (
            <AnswerModal
              show={this.showModel}
              close={this.closeModal}
              name={this.props.productname}
              question={this.props.question}
            />
          ):null}
        </div>
        <div>
          <Answer
            question={this.props.question.question_body}
            question_id={this.props.question.question_id}
            key={this.props.question.question_id}
          />
        </div>
      </div>

    );
  }
}

export default IndividualQuestion;
