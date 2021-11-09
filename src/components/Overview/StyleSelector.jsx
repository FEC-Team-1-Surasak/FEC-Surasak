/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import Thumbnail from './Thumbnail.jsx';

const StyleSelector = (props) => {
  if (props.styles === undefined) {
    return <></>;
  }
  return (
    <>
      <div>{<b>STYLE > </b>}{props.currentStyle.name}</div>
      <div className='style-selector-container'>
        {props.styles.map(style => {
          return <Thumbnail style={style} updateStyle={props.updateStyle} currentStyle={props.currentStyle} />;
        })}
      </div>
    </>
  );
};

export default StyleSelector;
