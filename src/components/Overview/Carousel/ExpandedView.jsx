/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
import React from 'react';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      x: 0,
      y: 0,
    };
    this.zoom = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  handleMouseMove(e) {
    // const zoom = document.getElementsByClassName('carousel-expanded-img-zoom');
    // console.log(e.clientX, e.clientY);
    this.zoom.current.style.backgroundPositionX = `${-e.offsetX}px`;
    this.zoom.current.style.backgroundPositionY = `${-e.offsetY}px`;
    // this.zoom.current.style.transform = `translate(${e.offsetX}px, ${e.offsetY}px)`;
  }

  render() {
    return (
      <div className="overview-carousel-expanded">
          {/* style={{backgroundImage: this.props.currentImgIndex.url}}
          ref={this.zoom}
          onClick={this.handleClick}
          onMouseMove={this.state.clicked === true ? (e) => this.handleMouseMove(e) : null} */}
        <img
          ref={this.zoom}
          className={this.state.clicked === true ? 'carousel-expanded-img-zoom' : 'carousel-expanded-img'}
          src={this.props.currentStyle.photos[this.props.currentImgIndex].url}
          onClick={this.handleClick}
          onMouseMove={this.state.clicked === true ? (e) => this.handleMouseMove(e) : null}
        />
        <button className="close-button" onClick={(e) => this.props.changeView('default')}>close[x]</button>
      </div>
    );
  }
}

export default ExpandedView;
