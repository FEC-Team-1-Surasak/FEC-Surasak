import React from 'react';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const thumbnailStyle = {
      height: 50,
      width: 50,
      borderRadius: 30,
    };
    return (
      <img
        style={thumbnailStyle}
        src={this.props.style.photos[0].thumbnail_url}
        onClick={() => this.props.updateStyle(this.props.style)}
      />
    );
  }
}

export default Thumbnail;
