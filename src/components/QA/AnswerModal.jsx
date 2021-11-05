/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React from 'react';
import axios from 'axios';
import PhotoSection from './PhotoSection.jsx';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      name: '',
      email: '',
      photo: [],
      expand: false,
    };
    this.answerChange = this.answerChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.submit = this.submit.bind(this);
    // this.expand = this.expand.bind(this);
    this.close = this.close.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  answerChange(e) {
    this.setState({ body: e.target.value });
  }

  nameChange(e) {
    this.setState({ name: e.target.value });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  // control the state of photo uploading
  // expand() {
  //   this.setState({ expand: true });
  //   console.log('invoking this');
  //   console.log(this.state.expand);
  // }

  // control the state of photo uploading
  close() {
    this.setState({ expand: false });
  }

  // checking if all input are valid before submit
  isValid() {
    if (this.state.body === '' || this.state.name === '' || this.state.email === '') {
      return false;
    }

    if (this.state.email !== '') {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(this.state.email);
    }

    return true;
  }

  // add an image to the state
  add(e) {
    if (this.state.photo.length === 5) {
      alert('You can only upload up to 5 photos');
    } else {
      const url = URL.createObjectURL(e.target.files[0]);
      const oldlist = this.state.photo;
      oldlist.push(url);
      this.setState({ photo: oldlist });
    }
  }

  delete(e) {
    console.log(e.target.src);
    const oldlist = this.state.photo;
    oldlist.splice(oldlist.indexOf(e.target.src), 1);
    this.setState({ photo: oldlist });
  }

  // submit a new answer
  submit() {
    if (this.isValid()) {
      axios.post('/qa/questions/:question_id/answers', {
        body: this.state.body,
        name: this.state.name,
        email: this.state.email,
        photo: this.state.photo
      }, { params: { question_id: this.props.question.question_id } })
        .then(() => { console.log('CREATE IT'); })
        .catch((err) => { console.log(err); });
    } else if (this.state.body === '' || this.state.name === '' || this.state.email === '') {
      alert('You must enter the following required information');
    } else {
      alert('Please enter a valid email address');
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="box">
          <h2>Submit your Answer</h2>
          <h3>
            {this.props.name}
            :
            {this.props.question.question_body}
          </h3>
          <div className="your-question">
            <h3>Your Answer</h3>
            <input onChange={this.answerChange} maxLength="1000" />
          </div>

          <div className="your-nickname">
            <h3>What is your nickname?</h3>
            <input onChange={this.nameChange} maxLength="60" placeholder="Example:jackson543" />
            <h5><i>For privacy reasons, do not use your full name or email address</i></h5>
          </div>

          <div className="your-email">
            <h3>Your email</h3>
            <input onChange={this.emailChange} maxLength="60" placeholder="Example: jack@email.com" />
            <h5><i>For authentication reasons, you will not be emailed</i></h5>
          </div>

          {/* upload a photo */}
          <div className="your-photo">
            <h3>Upload your photo</h3>
            <div className="add-photo">
              <div className="select-photo">
                <input type="file" accept="image/*" onChange={this.add} />
                <PhotoSection photolist={this.state.photo} delete={this.delete} />
              </div>
            </div>
          </div>

        </div>
        <div className="button">
          <button onClick={this.props.close}>Close</button>
          <button onClick={this.submit}>Submit Answer</button>
        </div>
      </div>

    );
  }
}
export default AnswerModal;
