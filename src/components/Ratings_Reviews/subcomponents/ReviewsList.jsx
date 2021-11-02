/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewsList = ({ reviews }) => (
  <div className="reviews-list-container">
    {
      reviews.map((review) => (<ReviewTile review={review} />))
    }
  </div>
);

export default ReviewsList;
