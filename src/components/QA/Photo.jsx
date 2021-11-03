/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/button-has-type */
import React from 'react';

class Photo extends React.Component {
  constructor() {
    super();
    this.state = {
      photo: [],
      expand: false,
    };
    this.expand = this.expand.bind(this);
    this.close = this.close.bind(this);
    this.upload = this.upload.bind(this);
  }

  expand() {
    this.setState({ expand: true });
  }

  close() {
    this.setState({ expand: false });
  }

  upload(e) {
    console.log('current event is',e);
    // this.setState({ photo: this.state.photo.push(url) });
  }

  render() {
    return (
      <div>
        <button onClick={this.expand}>Select Photo</button>
        {this.state.expand
          ? (
            <div className="select-photo">
              <input type="file" accept="image/*"/>
              <button onClick={this.close}>close</button>
            </div>
          )
          : null}
      </div>

    );
  }
}

export default Photo;
