/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import StarRatingStatic from './StarRatingStatic.jsx';

function getAverageRating(obj) {
  const result = [];
  const values = Object.values(obj);
  const keys = Object.keys(obj);
  let scoreSum = 0;
  let totalRatings = 0;
  for (let i = 0; i < values.length; i += 1) {
    const count = Number(values[i]);
    totalRatings += count;
    scoreSum += (keys[i] * values[i]);
  }
  const averageRating = scoreSum / totalRatings;
  result.push(totalRatings, scoreSum, averageRating);
  return result;
}

const RatingsContainer = ({ data }) => {
  const { ratings } = data;
  if (!ratings) {
    return <div>No metadata</div>;
  }

  const [totalRatings, scoreSum, averageRating] = getAverageRating(ratings);
  return (
    <div>
      <div className="average-rating">
        Average Rating:
        {' '}
        {averageRating.toFixed(1)}
        <StarRatingStatic rating={averageRating / 5} />
      </div>
      <div className="rating-breakdown">
        {/* <RatingsBreakdown ratings={ratings} totalRatings={totalRatings} /> */}
      </div>
    </div>
  );
};

export default RatingsContainer;
