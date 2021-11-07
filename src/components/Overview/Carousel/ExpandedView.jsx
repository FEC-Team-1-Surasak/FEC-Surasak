/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
import React from 'react';
import CarouselDefaultView from './CarouselDefaultView.jsx';

class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: true,
    });
  }

  render() {
    return (
      <div className="overview-carousel-expanded">
        <img
          className={this.state.clicked === true ? "carousel-expanded-img-zoom" : "carousel-expanded-img"}
          src={this.props.currentStyle.photos[this.props.currentImgIndex].url}
          onClick={this.handleClick}
        />
        <button className="close-button" onClick={(e) => this.props.changeView('default')}>close[x]</button>
      </div>
    );
  }
}

export default ExpandedView;
