import React from 'react';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <img
        className='default-thumbnail'
        src={this.props.style.photos[0].thumbnail_url}
        onClick={() => this.props.updateStyle(this.props.style)}
      />
    );
  }
}

export default Thumbnail;
