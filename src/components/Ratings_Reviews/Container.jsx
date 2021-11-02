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
import StarRating from './subcomponents/StarRatingDynamic.jsx';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: {},
      metaData: {},
    };
    this.getReviewData = this.getReviewData.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props;
    this.getReviewData(productId);
    this.getReviewMetaData(productId);
  }

  getReviewData(id, filter) {
    if (!filter) {
      filter = 'relevant';
    }
    axios.get(`/reviews/${id}/${filter}`)
      .then((reviews) => {
        this.setState({
          reviewData: reviews.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getReviewMetaData(id) {
    console.log('ID>>', id);
    axios.get(`/reviews/meta/${id}`)
      .then((reviews) => {
        this.setState({
          metaData: reviews.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { reviewData, metaData } = this.state;
    if (!reviewData.results) {
      return <div />;
    }
    return (
      <>
        <StarRating />
        <br />
        <RatingsContainer data={metaData} />
        <br />
        <ReviewsList reviews={reviewData.results} />
      </>
    );
  }
}
