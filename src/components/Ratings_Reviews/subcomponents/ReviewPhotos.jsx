/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

class ReviewPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      expanded: false,
    };
    this.expandPhoto = this.expandPhoto.bind(this);
    this.closePhoto = this.closePhoto.bind(this);
  }

  expandPhoto(e) {
    this.setState({
      image: e,
      expanded: true,
    });
  }

  closePhoto() {
    this.setState({
      image: '',
      expanded: false,
    });
  }

  render() {
    const { photos } = this.props;
    const { expanded, image } = this.state;

    return (
      <>
        {expanded
          ? (
            <div className="modal">
              <img src={image} alt={image} onClick={this.closePhoto} />
            </div>
          )
          : null}
        <div className="photo-container">
          {
            photos.map((photo) => (
              <img value={photo.url || photo} src={photo.url || photo} alt={photo.id || photo} key={photo.id || photo} height="100" onClick={() => { this.expandPhoto(photo.url || photo); }} />
            ))
          }
        </div>
      </>
    );
  }
}

export default ReviewPhotos;
