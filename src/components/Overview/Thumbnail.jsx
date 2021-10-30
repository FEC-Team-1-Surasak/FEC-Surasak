import React from 'react';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <img src={this.props.style.photos[0].thumbnail_url} />
    );
  }
}

export default Thumbnail;
