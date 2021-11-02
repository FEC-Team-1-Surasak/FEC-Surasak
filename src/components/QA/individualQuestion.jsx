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
    };
    this.onClick = this.onClick.bind(this);
    this.highlight = this.highlight.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

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

  // highklight the search term
  highlight(term) {
    if (term !== '') {
      return (
        <span>
          {this.props.question.question_body.split(' ')
            .map((item) => {
              const index = item.toLowerCase().indexOf(term.toLowerCase());
              if (index !== -1) {
                const regex = new RegExp(term, 'gi');
                const text = item.replace(regex, '<mark class="highlight">$&</mark>');

                return (
                  <span dangerouslySetInnerHTML={{ __html: `${text} ` }} />
                );
              }
              return <span>{`${item}\xa0`}</span>;
            })}
        </span>
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
          <b> Q:</b>
          {this.highlight(this.props.term)}
          <span>Helpful?</span>
          <span onClick={this.onClick}>
            Yes(
            {this.state.helpfulness}
            )
          </span>
          <span onClick={this.showModal}>
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
          <Answer question_id={this.props.question.question_id} />
        </div>
      </div>

    );
  }
}

export default IndividualQuestion;
