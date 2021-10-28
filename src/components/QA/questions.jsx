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
      // will change id to props.id once the component is ready to be deployed
      id: '37355',
      list: [],
    };
  }

  componentDidMount() {
    console.log('RUNNING')
    this.getlist(this.state.id);
  }

  getlist() {
    axios.get('/qa/questions', { params: { product_id: this.state.id } })
      .then(
        (response) => {
          this.setState({ list: response.data.results });
        },
      )
      .catch(
        (err) => { console.log('ERROR'); },
      );
  }

  render() {
    return (
      <div className="question-list">
        {this.state.list.map((question) => <IndividualQuestion question={question} />)}
      </div>

    );
  }
}

export default Question;
