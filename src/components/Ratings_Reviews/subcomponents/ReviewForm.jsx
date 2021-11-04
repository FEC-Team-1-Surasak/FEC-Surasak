/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import StarRatingDynamic from './StarRatingDynamic.jsx';
import CharacteristicsReview from './CharacteristicsReview.jsx';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      summary: '',
      body: '',
      username: '',
      email: '',
      photoUrls: '',
      characteristics: {},
      recommended: null,
    };
    this.change = this.change.bind(this);
    this.getRating = this.getRating.bind(this);
  }

  getRating(value) {
    this.setState({
      rating: value,
    });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { characteristics } = this.props.data;
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <StarRatingDynamic rating={this.getRating} />
        <div className="user-recommended">
          <span>Do you recommend this product? </span>
          <label>
            Yes
            <input
              name="recommended"
              type="radio"
              value="true"
              onChange={this.change}
            />
          </label>
          {' '}
          <label>
            No
            <input
              name="recommended"
              type="radio"
              value="false"
              onChange={this.change}
            />
          </label>
        </div>
        <CharacteristicsReview characteristics={characteristics} />
        <input
          name="summary"
          type="text"
          placeholder="Example: Best purchase ever!"
          onChange={this.change}
        />
      </form>
    );
  }
}

// productId is coming from props
