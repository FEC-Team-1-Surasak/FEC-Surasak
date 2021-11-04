/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import ReviewPhotos from './ReviewPhotos.jsx';
import HelpfulnessRating from './HelpfulnessRating.jsx';
import ReportButton from './ReportButton.jsx';
import StarRatingStatic from './StarRatingStatic.jsx';

const ReviewTile = ({ review }) => (
  <div className="review-tile">
    <StarRatingStatic rating={review.rating / 5} />
    <div className="review-date">{moment(review.date).format('MMMM Do YYYY')}</div>
    <div className="review-summary"><b>{review.summary}</b></div>
    <div className="review-body">{review.body}</div>
    {review.photos.length !== 0 ? <ReviewPhotos photos={review.photos} /> : <></>}
    {review.recommend ? <div>✅  Recommended by reviewer</div> : <></>}
    {review.response === null
      ? <></>
      : <div className="seller-response">
        <i>Seller Response: {review.response}</i>
      </div>}
    <HelpfulnessRating helpfulness={review.helpfulness} />
    <div className="reviewer">{review.reviewer_name}</div>
    <ReportButton review_id={review.review_id} />
    <br />
    <br />
  </div>
);

export default ReviewTile;
