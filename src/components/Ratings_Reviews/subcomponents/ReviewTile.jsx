/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import ReviewPhotos from './ReviewPhotos.jsx';
import HelpfulnessRating from './HelpfulnessRating.jsx';

const ReviewTile = ({ review }) => (
  <div className="review-tile">
    <div>
      Needs to be separate component Star Rating:
      { review.rating }
    </div>
    <div className="review-date">{moment(review.date).format('MMMM Do YYYY')}</div>
    <div clasName="review-summary"><b>{review.summary}</b></div>
    <div className="review-body">{review.body}</div>
    <ReviewPhotos photos={review.photos} />
    {review.recommend ? <div>✅  Recommended by reviewer</div> : <></>}
    {review.response === null
      ? <></>
      : <div className="seller-response">
        <i>Seller Response: {review.response}</i>
      </div>}
    <HelpfulnessRating helpfulness={review.helpfulness} />
    <div className="reviewer">{review.reviewer_name}</div>
    <br />
  </div>
);

export default ReviewTile;
