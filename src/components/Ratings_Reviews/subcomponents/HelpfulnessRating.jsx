/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';

class HelpfulnessRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.helpfulness,
      hasUpvoted: false,
      hasDownvoted: false,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.neutral = this.neutral.bind(this);
  }

  increment() {
    const { count } = this.state;
    this.setState({
      count: count + 1,
      hasUpvoted: true,
      hasDownvoted: false,
    });
  }

  neutral() {
    const { helpfulness } = this.props;
    this.setState({
      count: helpfulness,
      hasUpvoted: false,
      hasDownvoted: false,
    });
  }

  decrement() {
    const { count } = this.state;
    this.setState({
      count: count - 1,
      hasDownvoted: true,
      hasUpvoted: false,
    });
  }

  render() {
    const { count, hasUpvoted, hasDownvoted } = this.state;
    return (
      <div className="helpfulness-rating">
        Was this review helpful?
        <br />
        <div className="helpfulness-score">
          <button type="upvote" onClick={hasUpvoted ? this.neutral : this.increment}> 👍 </button>
          {'  '}
          {count}
          {'  '}
          <button type="downvote" onClick={hasDownvoted ? this.neutral : this.decrement}> 👎 </button>
        </div>
      </div>
    );
  }
}

export default HelpfulnessRating;
