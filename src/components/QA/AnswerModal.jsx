/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
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
import Body from './Body.jsx';
import Nickname from './Nickname.jsx';
import Email from './Email.jsx';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      name: '',
      email: '',
      photo: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80',
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80',
      ],
      preview: [],
    };
    this.answerChange = this.answerChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.submit = this.submit.bind(this);
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
      // if (file) {
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     console.log('invoking this');
      //     const oldstate = this.state.photo;
      //     oldstate.push(reader.result);
      //     this.setState({ photo: oldstate });
      //   };
      //   reader.readAsDataURL(file);
      const oldstate = this.state.preview;
      oldstate.push(url);
      this.setState({ preview: oldstate });
    }
  }

  delete(e) {
    const oldlist = this.state.preview;
    oldlist.splice(oldlist.indexOf(e.target.src), 1);
    this.setState({ preview: oldlist });
  }

  // verify if all the inputs are valid and submit a new answer
  submit() {
    if (this.isValid()) {
      axios.post('/qa/questions/:question_id/answers',
        {
          body: this.state.body,
          name: this.state.name,
          email: this.state.email,
          photo: this.state.photo,
        },

        { params: { question_id: this.props.question.question_id } })
        .then(() => {
          console.log('CREATE IT');
          alert('Thanks for submitting your answer!');
          this.props.close();
        })
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
          <Body label="answer" labelChange={this.answerChange} />
          <Nickname nameChange={this.nameChange} />
          <Email emailChange={this.emailChange} />

          <div className="your-photo">
            <h3>Upload your photo</h3>
            <div className="add-photo">
              <div className="select-photo">
                <input type="file" accept="image/*" onChange={this.add} />
                <PhotoSection photolist={this.state.preview} delete={this.delete} />
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
