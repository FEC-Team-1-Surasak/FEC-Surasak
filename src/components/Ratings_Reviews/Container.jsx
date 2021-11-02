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
// import StarRating from './subcomponents/StarRatingDynamic.jsx';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    const { productId } = this.props;
    this.state = {
      id: productId,
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
    const { id } = this.state;
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

  getReviewMetaData() {
    const { id } = this.state;
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
        <br />
        <RatingsContainer data={metaData} />
        <br />
        <SortDropdown getReviews={this.getReviewData} />
        <ReviewsList reviews={reviewData.results} />
      </>
    );
  }
}
