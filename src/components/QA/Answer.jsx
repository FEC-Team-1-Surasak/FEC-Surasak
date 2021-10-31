/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-alert */
/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import IndividualAnswer from './individualAnswer.jsx';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      len: 2,
      loading: 'See more answers',
    };
    this.getAnswer = this.getAnswer.bind(this);
    this.getMoreAnswers = this.getMoreAnswers.bind(this);
  }

  componentDidMount() {
    // callback function to move seller to the top of the answer list
    this.getAnswer(() => {
      const oldlist = this.state.list;
      for (let i = 1; i < this.state.list.length; i++) {
        if (oldlist[i].answerer_name === 'Seller') {
          const temp = oldlist[i - 1];
          oldlist[i - 1] = oldlist[i];
          oldlist[i] = temp;
        }
      }
      this.setState({ list: oldlist });
    });
  }

  // get a list of answers for a quesiotns
  getAnswer(callback) {
    axios.get('/qa/questions/:question_id/answers', { params: { question_id: this.props.question_id, count: 30 } })
      .then((response) => {
        this.setState({ list: response.data.results });
      })
      .then(callback)
      .catch((err) => { console.log(err); });
  }

  getMoreAnswers() {
    this.setState({ len: this.state.list.length });
    this.setState({ loading: 'Collapse answers' });
  }

  render() {
    if (this.state.list.length === 0) {
      return <div />;
    }
    return (
      <div>
        <div>
          {/* redner up to 2 answers */}
          {this.state.list.slice(0, this.state.len).map((answer) => (
            <div>
              <IndividualAnswer answer={answer} />
            </div>
          ))}
        </div>
        {(this.state.list.length > 2 && this.state.len < this.state.list.length) ? <span className="add-answer" onClick={this.getMoreAnswers}><u>{this.state.loading}</u></span> : ''}
      </div>
    );
  }
}

export default Answer;
