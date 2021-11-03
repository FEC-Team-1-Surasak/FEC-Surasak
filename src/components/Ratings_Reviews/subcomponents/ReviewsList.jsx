/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLength: 2,
    };
    this.showMoreReviews = this.showMoreReviews.bind(this);
  }

  showMoreReviews(e) {
    e.preventDefault();
    const { listLength } = this.state;
    this.setState({
      listLength: listLength + 2,
    });
  }

  render() {
    const { reviews } = this.props;
    const { listLength } = this.state;
    let remainingReviews = false;
    return (
      <>
        <div className="reviews-list-container">
          {
            reviews.map((review, i) => {
              if (i >= listLength) {
                remainingReviews = true;
                return <></>;
              }
              return <ReviewTile review={review} />;
            })
          }
          {remainingReviews ? <button type="submit" onClick={this.showMoreReviews}>Load More Reviews</button> : <></>}
        </div>
      </>
    );
  }
}

export default ReviewsList;
