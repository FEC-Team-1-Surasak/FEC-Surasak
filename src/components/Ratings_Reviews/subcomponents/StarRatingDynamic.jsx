import React from 'react';
import { FaStar } from 'react-icons/fa';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      hover: null,
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }

  clickHandler(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  mouseEnterHandler(value) {
    this.setState({
      hover: value,
    });
  }

  mouseLeaveHandler() {
    this.setState({
      hover: null,
    });
  }

  render() {
    const { rating, hover } = this.state;
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input type="radio" name="rating" value={ratingValue} onClick={this.clickHandler} />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? '#ffc110' : '#e3e8e4'}
                onMouseEnter={() => (this.mouseEnterHandler(ratingValue))}
                onMouseLeave={this.mouseLeaveHandler}
                size={20}
              />
            </label>
          );
        })}
      </div>
    );
  }
}

export default StarRating;
