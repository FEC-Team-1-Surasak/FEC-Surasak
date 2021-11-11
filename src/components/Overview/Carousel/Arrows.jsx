/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Arrows = (props) => {
  if (props.direction === 'right') {
    return (
      <div className={props.view === 'zoom' ? "expanded-carousel-arrow-R" : "overview-carousel-arrow-R"} onClick={props.next}>
        {'>'}
      </div>
    );
  }
  if (props.direction === 'left') {
    return (
      <div className={props.view === 'zoom' ? "expanded-carousel-arrow-L" : "overview-carousel-arrow-L"} onClick={props.previous}>
        {'<'}
      </div>
    );
  }
};

export default Arrows;
