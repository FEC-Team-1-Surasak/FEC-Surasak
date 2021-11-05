/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import React from 'react';
import CarouselThumbnail from './CarouselThumbnail.jsx';

class ThumbnailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const thumbnails = this.props.currentStyle.photos;
    const listStyle = {
      'z-index': 11,
      'max-width': '70px',
      'max-height': '380px',
      'overflow-y': 'auto',
      left: '15px',
      top: '20px',
      position: 'absolute',
      'text-align': 'center',
    };

    return (
      <div style={listStyle}>
        {thumbnails.map((thumbnail, i) => {
          return (
            <CarouselThumbnail
              url={thumbnail.thumbnail_url}
              selectIndex={this.props.selectIndex}
              index={i}
            />
          );
        })}
      </div>
    );
  }
}

export default ThumbnailList;
