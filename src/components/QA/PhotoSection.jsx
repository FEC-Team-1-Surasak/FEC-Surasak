/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

class PhotoSection extends React.Component {
  constructor() {
    super();
    this.state = {
      expand: false,
    };
  }

  expand() {
    const curr = this.state.expand;
    this.setState({ expand: !curr });
    console.log(this.state.expand);
  }

  render() {
    return (
      <div className="display-photo">
        {this.props.photolist.map((photo) => (
          <div className="photo-container">
            {console.log(photo)}
            <img className="photo-image" src={photo} alt="" width="100" height="150" onClick={this.expand.bind(this)} />
            <span className="close-icon" onClick={this.props.delete.bind(this)}>X</span>
            {this.state.expand
              ? (
                <img className="expand-image" src={photo} alt="" onClick={this.expand.bind(this)} />

              )
              : null}
          </div>
        ))}
      </div>

    );
  }
}

export default PhotoSection;
