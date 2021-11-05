/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

class CarouselThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    // this.clickHandler = this.clickHandler.bind(this);
  }

  // clickHandler(index) {
  //   this.props.selectIndex(index);
  //   const currentState = this.state.clicked;
  //   this.setState({
  //     clicked: !currentState,
  //   });
  // }

  render() {
    return (
      <div>
        <img
          className="overview-carousel-thumbnail"
          src={this.props.url}
          onClick={(e) => { this.props.selectIndex(this.props.index); }}
          // onClick={(e) => { this.clickHandler(this.props.index); }}
        />
      </div>
    );
  }
}

export default CarouselThumbnail;
