/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';
import React from 'react';
import ReviewsList from './subcomponents/ReviewsList.jsx';
import RatingsContainer from './subcomponents/RatingsContainer.jsx';
import SortDropdown from './subcomponents/SortDropdown.jsx';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: [],
      metaData: {},
      filteredReviews: [],
    };
    this.getReviewData = this.getReviewData.bind(this);
    this.getReviewMetaData = this.getReviewMetaData.bind(this);
    this.applyRatingFilters = this.applyRatingFilters.bind(this);
  }

  componentDidMount() {
    this.getReviewData();
    this.getReviewMetaData();
  }

  getReviewData(filter) {
    const { productId } = this.props;
    if (!filter) {
      filter = 'relevant';
    }
    axios.get(`/reviews/${productId}/${filter}`)
      .then((reviews) => {
        this.setState({
          reviewData: reviews.data.results,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getReviewMetaData() {
    const { productId } = this.props;
    axios.get(`/reviews/meta/${productId}`)
      .then((reviews) => {
        this.setState({
          metaData: reviews.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  applyRatingFilters(filter) {
    const { reviewData } = this.state;
    const filteredReviews = [];
    if (Object.values(filter).includes(true, 0)) {
      reviewData.forEach((review) => {
        if (filter[review.rating]) {
          filteredReviews.push(review);
        }
      });
    }
    this.setState({
      filteredReviews,
    });
  }

  render() {
    const { reviewData, metaData, filteredReviews } = this.state;
    const { productId } = this.props;

    if (Object.keys(reviewData).length === 0 || Object.keys(metaData).length === 0) {
      return (
        <>
          <RatingsContainer applyFilters={this.applyRatingFilters} data={metaData} />
          <ReviewsList
            reviews={filteredReviews.length === 0
              ? reviewData
              : filteredReviews}
            metaData={metaData}
            productId={productId}
          />
        </>
      );
    }
    return (
      <div id="reveiw" onClick={this.props.onclick.bind(this)}>
        <RatingsContainer applyFilters={this.applyRatingFilters} data={metaData} />
        <br />
        <SortDropdown getReviews={this.getReviewData} />
        <ReviewsList
          reviews={filteredReviews.length === 0
            ? reviewData
            : filteredReviews}
          metaData={metaData}
          productId={productId}
        />
      </div>
    );
  }
}
