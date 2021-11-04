/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';

export default class ReportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
    };
    this.reportReview = this.reportReview.bind(this);
  }

  reportReview() {
    const { reviewId } = this.props;
    const { reported } = this.state;
    if (reported) {
      window.alert(`Review ID:${reviewId} has already been reported.`);
      return;
    }
    axios.put('/reviews/report', { reviewId })
      .then(() => {
        this.setState({
          reported: true,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { reported } = this.state;
    return (
      <button type="submit" onClick={this.reportReview}>
        {reported ? 'Thank you for reporting this review' : 'Report Review'}
      </button>
    );
  }
}
