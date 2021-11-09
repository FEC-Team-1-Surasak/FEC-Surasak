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

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomed: false,
    };
    this.zoom = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    const mainImage = document.getElementsByClassName('overview-carousel-expanded')[0];
    mainImage.style.backgroundImage = `url('${this.props.currentStyle.photos[this.props.currentImgIndex].url}'`;
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
    this.setState(prevState => ({
      zoomed: !prevState.zoomed,
    }));
  }

  handleMouseMove(e) {
    const zoom = document.getElementsByClassName('overview-carousel-expanded')[0];
    zoom.addEventListener('mousemove', (e) => {
      const x = (e.pageX / window.innerWidth) * 100;
      const y = (e.pageY / window.innerHeight) * 100;
      zoom.style.transformOrigin = `${x}% ${y}%`
    });
  }

  render() {
    return (
      <div>
        <div
          className="overview-carousel-expanded"
          ref={this.zoom}
          onClick={(e) => this.handleClick(e)}
          onMouseMove={this.state.zoomed === true ? (e) => this.handleMouseMove(e) : null}
        >
          {/* <img
            ref={this.zoom}
            className={this.state.clicked === true ? 'carousel-expanded-img-zoom' : 'carousel-expanded-img'}
            src={this.props.currentStyle.photos[this.props.currentImgIndex].url}
            onClick={this.handleClick}
            onMouseMove={this.state.clicked === true ? (e) => this.handleMouseMove(e) : null}
          /> */}
        </div>
        <button className="close-button" onClick={() => this.props.changeView('default')}>close[x]</button>
      </div>
    );
  }
}

export default ExpandedView;
