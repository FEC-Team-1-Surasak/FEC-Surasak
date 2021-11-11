/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';

class HelpfulnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.helpfulness,
      hasUpvoted: false,
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    const { count } = this.state;
    const { reviewId } = this.props;
    axios.put('/reviews/helpful', { reviewId })
      .then(() => {
        this.setState({
          count: count + 1,
          hasUpvoted: true,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { count, hasUpvoted } = this.state;
    return (
      <>
        Helpful?
        {hasUpvoted
          ? <span className="helpfulness-rating"> 👌 </span>
          : <span className="helpfulness-rating btn" onClick={hasUpvoted ? this.neutral : this.increment}> 👍 </span>}
        {'  '}
        {count}
      </>
    );
  }
}

export default HelpfulnessRating;
