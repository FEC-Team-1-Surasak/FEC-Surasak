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
        <div className="photo-container">
          {
            photos.map((photo) => (
              <img className="review-thumbnail" value={photo.url || photo} src={photo.url || photo} alt={photo.id || photo} key={photo.id || photo} height="80" onClick={() => { this.expandPhoto(photo.url || photo); }} />
            ))
          }
        </div>
        {expanded
          ? (
            <div className="modal-bg" style={{ backgroundColor: 'rgba(0,0,0, 0.85)' }}>
              <div className="modal-shroud">
                <img className="modal-img" src={image} alt={image} onClick={this.closePhoto} />
              </div>
            </div>
          )
          : null}
      </>
    );
  }
}

export default ReviewPhotos;
