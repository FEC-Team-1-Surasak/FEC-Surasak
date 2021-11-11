/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

class PhotoSection extends React.Component {
  constructor() {
    super();
    this.state = {
      expand: false,
      curr: '',
    };
  }

  expand(e) {
    const curr = this.state.expand;
    this.setState({ expand: !curr });
    this.setState({ curr: e.target });
  }

  render() {
    return (
      <div className="display-photo">
        {this.props.photolist.map((photo) => (
          <div className="photo-container">
            <img className="photo-image" src={photo} alt="" width="100" height="150" onClick={this.expand.bind(this)} />
            <span className="close-icon" onClick={this.props.delete.bind(this)}>X</span>
            {this.state.expand
              ? (
                <img className="expand-image" src={this.state.curr.src} alt="" onClick={this.expand.bind(this)} />
              )
              : null}
          </div>
        ))}
      </div>

    );
  }
}

export default PhotoSection;
