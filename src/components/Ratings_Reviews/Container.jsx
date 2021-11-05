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
import ReviewForm from './subcomponents/ReviewForm.jsx';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: {},
      metaData: {},
    };
    this.getReviewData = this.getReviewData.bind(this);
    this.getReviewMetaData = this.getReviewMetaData.bind(this);
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
        console.log(err);
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

  render() {
    const { reviewData, metaData } = this.state;
    const { productId } = this.props;
    if (Object.keys(reviewData).length === 0 || Object.keys(metaData).length === 0) {
      return <div />;
    }
    return (
      <>
        <ReviewForm data={metaData} productId={productId} />
        <br />
        <RatingsContainer data={metaData} />
        <br />
        <SortDropdown getReviews={this.getReviewData} />
        <ReviewsList reviews={reviewData} />
      </>
    );
  }
}
