/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      cnt: 0,
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
        console.log(this.props.question_id, this.state.list);
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
            <div className="answer">
              {' '}
              <b>A:</b>
              {answer.body}
            </div>
            <div className="user-name">
              by user
              {answer.answerer_name === 'Seller' ? <b>Seller</b> : answer.answerer_name}
              ,
              {' '}
              {new Date(answer.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Answer;
