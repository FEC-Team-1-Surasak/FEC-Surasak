/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Arrows from './Arrows.jsx';
import CarouselImage from './CarouselImage.jsx';
import ThumbnailList from './ThumbnailList.jsx';

class CarouselDefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: this.props.currentStyle,
      currentImgIndex: 0,
    };

    this.updateStyle = this.updateStyle.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.selectIndex = this.selectIndex.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({
        currentStyle: this.props.currentStyle,
      }), 1000,
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.updateStyle(this.props.currentStyle);
    }
  }

  updateStyle(style) {
    this.setState({
      currentStyle: style,
    });
  }

  previous() {
    const { currentImgIndex } = this.state;
    const newIndex = currentImgIndex - 1;
    this.setState({
      currentImgIndex: newIndex,
    });
  }

  next() {
    const { currentImgIndex } = this.state;
    const newIndex = currentImgIndex + 1;
    this.setState({
      currentImgIndex: newIndex,
    });
  }

  selectIndex(index) {
    this.setState({
      currentImgIndex: index,
    });
  }

  render() {
    if (this.state.currentStyle.photos === undefined) {
      return <div />;
    }

    return (
      <div className="overview-carousel-container">
        <CarouselImage url={this.state.currentStyle.photos[this.state.currentImgIndex].url} />

        {this.state.currentImgIndex === 0 ? null : <Arrows direction="left" previous={this.previous} />}

        {this.state.currentImgIndex === this.state.currentStyle.photos.length - 1 ? null : <Arrows direction="right" next={this.next} />}
        <ThumbnailList
          currentStyle={this.state.currentStyle}
          currentImgIndex={this.state.currentImgIndex}
          selectIndex={this.selectIndex}
        />
      </div>
    );
  }
}

export default CarouselDefaultView;
