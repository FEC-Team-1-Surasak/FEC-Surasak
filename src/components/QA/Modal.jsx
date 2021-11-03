/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/require-render-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: '',
    };
    this.questionChange = this.questionChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.submit = this.submit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  questionChange(e) {
    this.setState({ question: e.target.value });
  }

  nameChange(e) {
    this.setState({ nickname: e.target.value });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  isValid() {
    console.log('checking if it is valid');
    if (this.state.question === '' || this.state.name === '' || this.state.email === '') {
      return false;
    }

    if (this.state.email !== '') {
      console.log(this.state.email);
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(this.state.email);
    }

    return true;
  }

  // submit a new questions
  submit() {
    if (this.isValid()) {
      axios.post('/qa/questions', {
        body: this.state.question,
        name: this.state.nickname,
        email: this.state.email,
        product_id: this.props.productid,
      })
        .then(() => { console.log('CREATE IT'); })
        .catch((err) => { console.log(err); });
    } else if (this.state.question === '' || this.state.name === '' || this.state.email === '') {
      alert('You must enter the following required information');
    } else {
      alert('Please enter a valid email address');
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="box">
          <h2>Ask Your Question</h2>
          <h3>
            About the
            {' '}
            {this.props.productname}
          </h3>
          <div className="your-question">
            <h3>Your Question</h3>
            <input onChange={this.questionChange} maxLength="1000" />
          </div>

          <div className="your-nickname">
            <h3>What is your nickname?</h3>
            <input onChange={this.nameChange} maxLength="60" placeholder="Example:jackson111" />
            <h5><i>For privacy reasons, do not use your full name or email address</i></h5>
          </div>

          <div className="your-email">
            <h3>Your email</h3>
            <input onChange={this.emailChange} maxLength="60" placeholder="Why did you like the product or not?" />
            <h5><i>For authentication reasons, you will not be emailed</i></h5>
          </div>

        </div>
        <div className="button">
          <button onClick={this.props.close}>Close</button>
          <button onClick={this.submit}>Submit Question</button>
        </div>
      </div>
    );
  }
}

export default Modal;
