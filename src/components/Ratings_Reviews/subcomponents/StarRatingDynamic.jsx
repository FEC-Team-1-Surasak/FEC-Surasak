/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Star from './Icons/Star.jsx';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    const { rating } = this.props;
    rating(e.target.value);
    this.setState({
      rating: e.target.value,
    });
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                className="star-radio"
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={this.clickHandler}
              />
              <Star
                className="star"
                value={ratingValue}
                color={ratingValue <= rating ? '#ffc110' : '#e3e8e4'}
                size="1em"
              />
            </label>
          );
        })}
      </div>
    );
  }
}

export default StarRating;
