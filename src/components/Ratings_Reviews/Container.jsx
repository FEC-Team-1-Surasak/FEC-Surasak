/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';
import React from 'react';

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

  getReviewData(id) {
    axios.get(`/reviews/${id}`)
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
    axios.get(`/reviews/${id}`)
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
    return (
      <div>This that data!</div>
    );
  }
}
