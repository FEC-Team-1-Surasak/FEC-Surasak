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
import AddAnswer from './AddAnswer.jsx';
import Answer from './Answer.jsx';

class IndividualQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.question.question_helpfulness,
      cnt: 0,
      answers: [],
    };
    this.onClick = this.onClick.bind(this);
    this.highlight = this.highlight.bind(this);
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
        </div>
        <div>
          <Answer question_id={this.props.question.question_id} />
        </div>

        {/* <AddAnswer /> */}
      </div>

    );
  }
}

export default IndividualQuestion;
