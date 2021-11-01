/* eslint-disable react/prop-types */
import React from 'react';

const ReviewPhotos = ({ photos }) => (
  <div className="photo-container">
    {
      photos.map((photo) => (
        <img src={photo.url} alt={photo.id} height="100" width="100" />
      ))
    }
  </div>
);

export default ReviewPhotos;
