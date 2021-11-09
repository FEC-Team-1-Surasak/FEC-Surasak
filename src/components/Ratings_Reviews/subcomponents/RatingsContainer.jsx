/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react';
import StarRatingStatic from './StarRatingStatic.jsx';
import RatingBar from './RatingBar.jsx';
import CharacteristicSlider from './CharacteristicSlider.jsx';

class RatingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        5: false,
        4: false,
        3: false,
        2: false,
        1: false,
      },
    };
    this.getRatingData = this.getRatingData.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }

  getRatingData() {
    const { data } = this.props;
    const { ratings: obj } = data;
    const ratingPercent = {
      5: null,
      4: null,
      3: null,
      2: null,
      1: null,
    };
    const result = [];
    const values = Object.values(obj);
    const keys = Object.keys(obj);
    let scoreSum = 0;
    let totalRatings = 0;

    for (let i = 0; i < keys.length; i += 1) {
      const count = Number(values[i]);
      totalRatings += count;
      scoreSum += (keys[i] * values[i]);
    }

    for (let i = 1; i < 6; i += 1) {
      if (obj[i]) {
        ratingPercent[i] = Math.round((obj[i] / totalRatings) * 100);
      } else {
        ratingPercent[i] = 0;
      }
    }

    const averageRating = scoreSum / totalRatings;
    result.push(totalRatings, scoreSum, averageRating, ratingPercent);

    return result;
  }

  addFilter(e) {
    const { applyFilters } = this.props;
    const { filter } = this.state;
    filter[e] = !filter[e];
    applyFilters(filter);
    this.setState({
      filter,
    });
  }

  render() {
    const { data } = this.props;
    const { ratings, characteristics } = data;
    console.log(data);

    if (!ratings) {
      return <div>No metadata</div>;
    }

    const [totalRatings, scoreSum, averageRating, ratingPercent] = this.getRatingData();
    return (
      <div>
        <div className="average-rating">
          Average Rating:
          {' '}
          {averageRating.toFixed(1)}
          <StarRatingStatic rating={averageRating / 5} />
          {'Total Reviews: '}
          {totalRatings}
        </div>
        <br />
        <div className="percent-recommended">
          {`Recommended by ${Math.round((data.recommended.true / totalRatings) * 100)}% of reviewers`}
        </div>
        <br />
        <div className="rating-breakdown-container">
          {
            Object.keys(ratingPercent).map((rating, i) => (
              <div key={rating} onClick={() => this.addFilter(rating)}>
                <RatingBar
                  rating={rating}
                  completed={ratingPercent[rating]}
                />
              </div>
            ))
          }
          {
            Object.keys(characteristics).map((characteristic) => (
              <CharacteristicSlider
                key={characteristic}
                characteristic={characteristic}
                charObj={characteristics[characteristic]}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default RatingsContainer;
