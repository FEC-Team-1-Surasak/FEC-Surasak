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
  <div className="review-tile tile-grid">
    <div className="star-rating-grid">
      <StarRatingStatic rating={review.rating / 5} />
    </div>
    <div className="review-date review-date-grid">{review.reviewer_name}, {moment(review.date).format('MMMM Do YYYY')}</div>
    <div className="review-summary review-summary-grid">
      {review.summary.length <= 60
        ? <b>{review.summary}</b>
        : (
          <>
            <b>{`${review.summary.slice(0, 60)}...`}</b>
            <br />
            <span>{`...${review.summary.slice(60)}`}</span>
          </>
        )}
      <br />
      {review.body}
      <br />
      {review.photos.length !== 0 ? <ReviewPhotos photos={review.photos} /> : null}
    </div>
    {review.recommend ? <div className="recommended-grid"> &#x2611; I recommend this product</div> : <></>}
    {review.response === null || review.response.length === 0
      ? <></>
      : <div className="seller-response-grid">
        <b>Seller Response:</b>
        <br />
        {review.response}
      </div>}
    <span className="review-tile-buttons-grid">
      <HelpfulnessRating reviewId={review.review_id} helpfulness={review.helpfulness} />
      {' | '}
      <ReportButton reviewId={review.review_id} />
    </span>
  </div>
);

export default ReviewTile;
