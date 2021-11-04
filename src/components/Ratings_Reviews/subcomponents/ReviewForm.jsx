/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
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
      rendered: false,
      textCount: 0,
    };
    this.change = this.change.bind(this);
    this.getRating = this.getRating.bind(this);
    this.getCharScore = this.getCharScore.bind(this);
  }

  getRating(value) {
    this.setState({
      rating: value,
    });
  }

  getCharScore(obj) {
    this.setState({
      characteristics: { ...obj },
    });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { data } = this.props;
    const { characteristics } = data;
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          Rating:
          <br />
          <StarRatingDynamic rating={this.getRating} />
        </div>
        <br />
        <div className="user-recommended radio-group">
          <span>Do you recommend this product? </span>
          <br />
          <label>
            <input
              name="recommended"
              type="radio"
              value="true"
              onChange={this.change}
            />
            Yes
          </label>
          {' '}
          <label>
            <input
              name="recommended"
              type="radio"
              value="false"
              onChange={this.change}
            />
            No
          </label>
        </div>
        <br />
        <div>Characteristics Ratings</div>
        <CharacteristicsReview func={this.getCharScore} characteristics={characteristics} />
        <label>
          Review Summary:
          <br />
          <input
            name="summary"
            type="text"
            placeholder="Example: Best purchase ever!"
            onChange={this.change}
            maxLength="60"
          />
        </label>
        <br />
        <label>
          Review Summary:
          <br />
          <textarea
            name="body"
            type="text"
            placeholder="Why did you like the product or not?"
            onChange={this.change}
            minLength="50"
            maxLength="1000"
            value={this.state.body}
          />
          <div>
            {this.state.body.length < 50
              ? `Minimum required characters left: ${50 - this.state.body.length}`
              : `Minimum reached. Maximum remaining characters left: ${1000 - this.state.body.length}`}
          </div>
        </label>
        <br />
      </form>
    );
  }
}

// productId is coming from props
