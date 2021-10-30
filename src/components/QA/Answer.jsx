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
    };
    this.getAnswer = this.getAnswer.bind(this);
  }

  componentDidMount() {
    this.getAnswer();
  }

  // get a list of answers for a quesiotns
  getAnswer() {
    axios.get('/qa/questions/:question_id/answers', { params: { question_id: this.props.question_id } })
      .then((response) => {
        this.setState({ list: response.data.results });
      })
      .catch((err) => { console.log(err); });
  }


  render() {
    if (this.state.list.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.state.list.slice(0, 2).map((answer) => (
          <div>
            <IndividualAnswer answer={answer} />
          </div>
        ))}
      </div>
    );
  }
}

export default Answer;
