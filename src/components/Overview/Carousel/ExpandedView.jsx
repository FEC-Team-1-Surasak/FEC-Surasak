import React from 'react';
import CarouselDefaultView from './CarouselDefaultView.jsx';

const ExpandedView = (props) => {
  return (
    <>
      {/* <div className="overview-carousel-expanded"></div> */}
      <img className="overview-carousel-expanded" src={props.currentStyle.photos[props.currentImgIndex].url}></img>
      <button className="close-button" onClick={(e) => props.changeView('default')}>close[x]</button>
    </>
  );
}

export default ExpandedView;
