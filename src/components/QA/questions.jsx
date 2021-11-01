/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable func-call-spacing */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import IndividualQuestion from './individualQuestion.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // will change id to this.props.id once the component is ready to be deployed
      id: '37366',
      list: [],
      len: 2,

    };
    this.getMoreAnswers = this.getMoreAnswers.bind(this);
  }

  componentDidMount() {
    this.getlist(this.state.id);
  }

  // get a list of quesitons from the API
  getlist() {
    axios.get('/qa/questions', { params: { product_id: this.state.id, count: 30 } })
      .then(
        (response) => {
          this.setState({ list: response.data.results });
        },
      )
      .catch(
        (err) => { console.log('ERROR'); },
      );
  }

  getMoreAnswers() {
    this.setState({ len: this.state.len + 2 });
  }

  render() {
    return (
      <div>
        <div className="question-list">
          {this.state.list.slice(0, this.state.len).map((question) => <IndividualQuestion question={question} key={question.question_id} />)}
        </div>
        {(this.state.list.length > 2 && this.state.len < this.state.list.length) ? <button onClick={this.getMoreAnswers} type="submit"> MORE ANSWERED QUESTIONS</button> : ''}
      </div>
    );
  }
}

export default Question;
