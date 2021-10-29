/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';
import React from 'react';
import ListContainer from './Subcomponents/ListContainer.jsx';

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
    const { reviewData } = this.state;
    if (!reviewData.results) {
      return <div />;
    }
    console.log(reviewData.results);
    return (
      <>
        <ListContainer reviews={reviewData.results} />
      </>
    );
  }
}
