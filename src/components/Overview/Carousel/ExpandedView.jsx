/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
import React from 'react';
import Arrows from './Arrows.jsx';
import HorizontalThumbnail from './HorizontalThumbnail.jsx';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomed: false,
      currentImgIndex: 0,
    };
    this.zoom = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateImgIndex = this.updateImgIndex.bind(this);
  }

  componentDidMount() {
    this.updateImage(this.props.currentImgIndex);
  }

  updateImage(index) {
    const mainImage = document.getElementsByClassName('overview-carousel-expanded')[0];
    mainImage.style.backgroundImage = `url('${this.props.currentStyle.photos[index].url}'`;

    this.setState({
      currentImgIndex: index,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentImgIndex !== prevProps.currentImgIndex) {
      this.updateImage(this.props.currentImgIndex);
    }
  }

  handleClick() {
    const zoom = document.getElementsByClassName('overview-carousel-expanded')[0];
    if (this.state.zoomed === false) {
      zoom.style.transform = 'scale(2.5)';
      zoom.style.cursor = 'zoom-out';
    } else {
      zoom.style.transform = 'scale(1)';
      zoom.style.cursor = 'zoom-in';
    }
    this.setState((prevState) => ({
      zoomed: !prevState.zoomed,
    }));
  }

  handleMouseMove() {
    const zoom = document.getElementsByClassName('overview-carousel-expanded')[0];
    zoom.addEventListener('mousemove', (e) => {
      const x = (e.pageX / window.innerWidth) * 100;
      const y = (e.pageY / window.innerHeight) * 100;
      zoom.style.transformOrigin = `${x}% ${y}%`
    });
  }

  updateImgIndex(index) {
    this.props.updateImgIndex(index);
  }

  render() {
    return (
      <div>
        <div
          className="overview-carousel-expanded"
          ref={this.zoom}
          onClick={() => this.handleClick()}
          onMouseMove={this.state.zoomed === true ? () => this.handleMouseMove() : null}
        />

        {this.props.currentImgIndex === 0 ? null : <Arrows direction="left" previous={(e) => this.props.updateImgIndex(this.props.currentImgIndex - 1)} />}

        {this.props.currentImgIndex === this.props.currentStyle.photos.length - 1 ? null : <Arrows direction="right" next={(e) => this.props.updateImgIndex(this.props.currentImgIndex + 1)} />}

        <button className="close-button" onClick={() => this.props.changeView('default')}>close[x]</button>

        {/* <div className="horizontal-thumbnail-container"> */}
          {!this.state.zoomed ? (
            <HorizontalThumbnail
              currentStyle={this.props.currentStyle}
              currentImgIndex={this.state.currentImgIndex}
              updateImgIndex={this.props.updateImgIndex}
            />
          )
            : null}
        {/* </div> */}

      </div>
    );
  }
}

export default ExpandedView;
