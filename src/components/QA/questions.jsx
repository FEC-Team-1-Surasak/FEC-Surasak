/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
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
      filteredList: [],
      term: '',

    };
    this.getMoreQuestions = this.getMoreQuestions.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.search = this.search.bind(this);
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
          this.setState({ filteredList: response.data.results });
        },
      )
      .catch(
        (err) => { console.log('ERROR'); },
      );
  }

  getMoreQuestions() {
    this.setState({ len: this.state.len + 2 });
  }

  // onChange funciton to handle the search component
  onChange(e) {
    this.setState({ term: e.target.value }, () => {
      if (this.state.term.length >= 3) {
        const filtered = this.state.list.slice(0, this.state.len).filter(
          (question) => question.question_body.toLowerCase().includes(this.state.term.toLowerCase()),
        );
        this.setState({ filteredList: filtered });
      } else {
        this.setState({ filteredList: this.state.list });
      }
    });
  }

  render() {
    return (
      <div>
        <input placeholder="Have a question? Search for answers…" onChange={this.onChange} />
        <div className="question-list">
          {this.state.filteredList.slice(0, this.state.len).map((question) => <IndividualQuestion question={question} key={question.question_id} term={this.state.term} />)}
        </div>
        {(this.state.list.length > 2 && this.state.len < this.state.list.length) ? <button className="add-quetsions" onClick={this.getMoreQuestions} type="submit"> MORE ANSWERED QUESTIONS</button> : ''}
      </div>
    );
  }
}

export default Question;