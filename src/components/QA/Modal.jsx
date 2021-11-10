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
import Body from './Body.jsx';
import Nickname from './Nickname.jsx';
import Email from './Email.jsx';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: '',
    };
    this.labelChange = this.labelChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.submit = this.submit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  labelChange(e) {
    this.setState({ question: e.target.value });
  }

  nameChange(e) {
    this.setState({ nickname: e.target.value });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  isValid() {
    if (this.state.question === '' || this.state.name === '' || this.state.email === '') {
      return false;
    }
    if (this.state.email !== '') {
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
        .then(() => {
          console.log('CREATE IT');
          alert('Thanks for submitting your answer!');
          this.props.close();
        })
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
          <h2 className="box-title">Ask Your Question</h2>
          <h3 className="box-title">
            About the
            {' '}
            {this.props.productname}
          </h3>
          <Body label="question" labelChange={this.labelChange} />
          <Nickname nameChange={this.nameChange} />
          <Email emailChange={this.emailChange} />
          <div className="button">
            <button onClick={this.props.close}>Close</button>
            {' '}
            <button onClick={this.submit}>Submit</button>
          </div>
        </div>

      </div>
    );
  }
}

export default Modal;
