/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
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
    this.clearFilter = this.clearFilter.bind(this);
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

  clearFilter() {
    const { applyFilters } = this.props;
    const filter = {
      5: false,
      4: false,
      3: false,
      2: false,
      1: false,
    };
    applyFilters(filter);
    this.setState({
      filter,
    });
  }

  render() {
    const { data } = this.props;
    const { ratings, characteristics } = data;
    const { filter } = this.state;

    if (!ratings) {
      return null;
    }

    const [totalRatings, scoreSum, averageRating, ratingPercent] = this.getRatingData();
    const percentRecommended = Math.round((data.recommended.true / totalRatings) * 100);

    if (totalRatings === 0) {
      return <div>No reviews</div>;
    }
    return (
      <>
        <div className="average-rating">
          <span>
            {averageRating.toFixed(1)}
            <StarRatingStatic rating={averageRating / 5} />
          </span>
        </div>
        <br />
        <div className="percent-recommended">
          {`${Number.isNaN(percentRecommended) ? 0 : percentRecommended}% of reviewers recommended this product`}
        </div>
        <br />
        <div className="rating-breakdown-container">
          <div className="starbar-container">
            {
              Object.keys(ratingPercent).reverse().map((rating, i) => (
                <div key={rating} onClick={() => this.addFilter(rating)}>
                  <RatingBar
                    rating={rating}
                    completed={ratingPercent[rating]}
                  />
                </div>
              ))
            }
          </div>
          {Object.values(filter).includes(true)
            ? <button className="btn" onClick={this.clearFilter}>Clear Filters</button>
            : null }
          <br />
          <div className="sliders-container">
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
      </>
    );
  }
}

export default RatingsContainer;
