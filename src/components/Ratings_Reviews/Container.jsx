/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';
import React from 'react';
import ListContainer from './Subcomponents/ListContainer';

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
    // TODO: add list filter options.
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
