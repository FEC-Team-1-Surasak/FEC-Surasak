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
      currentImgIndex: this.props.currentImgIndex,
    };
    this.updateStyle = this.updateStyle.bind(this);
    this.selectIndex = this.selectIndex.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({
        currentStyle: this.props.currentStyle,
        currentImgIndex: this.props.currentImgIndex,
      }), 1000,
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.updateStyle(this.props.currentStyle);
    }
    if (this.props.currentImgIndex !== prevProps.currentImgIndex) {
      this.selectIndex(this.props.currentImgIndex);
    }
  }

  updateStyle(style) {
    const oldIndex = this.state.currentImgIndex;
    this.setState({
      currentStyle: style,
      currentImgIndex: !style.photos[oldIndex] ? 0 : oldIndex,
    });
  }

  selectIndex(index) {
    this.props.updateImgIndex(index);
    this.setState({
      currentImgIndex: index,
    });
  }

  render() {
    if (this.state.currentStyle.photos === undefined) {
      return <div />;
    }
    if (this.state.currentImgIndex === undefined) {
      return <div />;
    }
    return (
      <div className="overview-carousel-container">
        <CarouselImage url={this.state.currentStyle.photos[this.state.currentImgIndex].url} changeView={this.props.changeView} />

        {this.state.currentImgIndex === 0 ? null : <Arrows direction="left" previous={(e) => this.props.updateImgIndex(this.state.currentImgIndex - 1)} />}

        {this.state.currentImgIndex === this.state.currentStyle.photos.length - 1 ? null : <Arrows direction="right" next={(e) => this.props.updateImgIndex(this.state.currentImgIndex + 1)} />}

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
