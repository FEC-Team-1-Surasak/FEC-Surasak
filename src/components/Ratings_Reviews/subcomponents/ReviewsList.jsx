/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import ReviewForm from './ReviewForm.jsx';
import SortDropdown from './SortDropdown.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLength: 2,
      expand: false,
    };
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.expand = this.expand.bind(this);
  }

  showMoreReviews() {
    const { listLength } = this.state;
    this.setState({
      listLength: listLength + 2,
    });
  }

  expand() {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  }

  render() {
    const {
      reviews, metaData, productId, getReviews,
    } = this.props;
    const { listLength, expand } = this.state;
    let remainingReviews = false;
    return (
      <>
        <span>
          {reviews.length}
          {' '}
          reviews, sorted by
          {' '}
          <SortDropdown getReviews={getReviews} />
        </span>
        <div className="reviews-list-container">
          {
            reviews.map((review, i) => {
              if (i >= listLength) {
                remainingReviews = true;
                return <div key={review.review_id} display="hidden" />;
              }
              return <ReviewTile key={review.review_id} review={review} />;
            })
          }
        </div>
        {remainingReviews
          ? (
            <button className="btn" onClick={this.showMoreReviews}>
              Load More Reviews
            </button>
          )
          : null}
        <button className="btn" onClick={this.expand}>
          Add Review
        </button>
        {expand
          ? <ReviewForm data={metaData} productId={productId} close={this.expand} />
          : null}
      </>
    );
  }
}

export default ReviewsList;
