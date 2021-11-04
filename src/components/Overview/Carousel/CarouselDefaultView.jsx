/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Arrows from './Arrows.jsx';
import CarouselImage from './CarouselImage.jsx';

class CarouselDefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: this.props.currentStyle,
      currentImgIndex: 0,
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({
        style: this.props.currentStyle,
      }), 1000,
    );
  }

  previous() {
    const images = this.props.currentStyle.photos;
    const lastIndex = images.length - 1;
    const { currentImgIndex } = this.state;
    const shouldReset = currentImgIndex === 0;
    const newIndex = shouldReset ? lastIndex : currentImgIndex - 1;

    this.setState({
      currentImgIndex: newIndex,
    });
  }

  next() {
    const images = this.props.currentStyle.photos;
    const lastIndex = images.length - 1;
    const { currentImgIndex } = this.state;
    const shouldReset = currentImgIndex === lastIndex;
    const newIndex = shouldReset ? 0 : currentImgIndex + 1;

    this.setState({
      currentImgIndex: newIndex,
    });
  }

  render() {
    if (this.state.style.photos === undefined) {
      return <div />;
    }
    return (
      <div>
        <Arrows direction="left" onClick={this.previous} arrow="<" />

        <CarouselImage url={this.state.style.photos[this.state.currentImgIndex].url} />

        <Arrows direction="right" onClick={this.next} arrow=">" />
      </div>
    );
  }
}

export default CarouselDefaultView;
