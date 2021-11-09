/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import StarRatingDynamic from './StarRatingDynamic.jsx';
import CharacteristicsReview from './CharacteristicsReview.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      summary: '',
      body: '',
      nickname: '',
      email: '',
      photoUrls: [],
      characteristics: {},
      recommended: null,
      expand: false,
      uploadUrls: false,
    };
    this.change = this.change.bind(this);
    this.getRating = this.getRating.bind(this);
    this.getCharScore = this.getCharScore.bind(this);
    this.submitReview = this.submitReview.bind(this);
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
    if (e.target.name === 'photoUrls') {
      const value = e.target.value.split(', ');
      this.setState({ [e.target.name]: value });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  submitReview() {
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    const { productId, data, close } = this.props;
    const { characteristics: requiredChars } = data;
    const {
      rating,
      summary,
      body,
      recommended,
      nickname,
      email,
      photoUrls,
      characteristics,
    } = this.state;

    if (rating === null) {
      return window.alert('Submission Invalid: Please rate item 1 - 5 stars');
    }
    if (recommended === null) {
      return window.alert('Submission Invalid: Please choose whether or not to recommend this product');
    }
    if (Object.keys(requiredChars).length !== Object.keys(characteristics).length) {
      return window.alert('Submission Invalid: Please rate all characteristics presented');
    }
    if (summary.length < 1) {
      return window.alert('Submission Invalid: Please provide a summary for your review');
    }
    if (body.length < 50) {
      return window.alert('Submission Invalid: Please provide a body that is at least 50 characters long');
    }
    if (nickname.length < 1) {
      return window.alert('Submission Invalid: Please enter a nickname');
    }
    if (email.length < 1 || !validateEmail(email)) {
      return window.alert('Submission Invalid: Please enter a valid email');
    }

    const reviewSubmission = {
      product_id: JSON.parse(productId),
      rating: JSON.parse(rating),
      summary,
      body,
      recommend: JSON.parse(recommended),
      name: nickname,
      email,
      photos: photoUrls,
      characteristics,
    };

    axios.post('/reviews', reviewSubmission)
      .then(() => {
        window.alert('Thank you for your submission');
        this.setState({
          rating: null,
          summary: '',
          body: '',
          nickname: '',
          email: '',
          photoUrls: [],
          characteristics: {},
          recommended: null,
          expand: false,
        });
        close();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { data, close } = this.props;
    const { characteristics } = data;
    const { body, uploadUrls, photoUrls } = this.state;
    return (
      <div className="modal">
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
              value={body}
            />
            <div>
              {body.length < 50
                ? `Minimum required characters left: ${50 - body.length}`
                : `Minimum reached. Maximum remaining characters left: ${1000 - body.length}`}
            </div>
          </label>
          <br />
          <button name="submit-url" onClick={() => this.setState({ uploadUrls: true })}>
            Upload Photos
          </button>
          {uploadUrls
            ? (
              <div className="image-upload">
                <textarea
                  name="photoUrls"
                  type="text"
                  placeholder="Add image urls here separated by a comma and space"
                  value={photoUrls.join(', ')}
                  onChange={this.change}
                />
                <ReviewPhotos photos={photoUrls} />
              </div>
            )
            : null}
          <br />
          <br />
          <label>
            Nickname:
            <br />
            <input
              name="nickname"
              type="text"
              placeholder="Example: jackson11!"
              onChange={this.change}
              maxLength="60"
            />
            <div>For privacy reasons, do not use your full name or email address</div>
          </label>
          <br />
          <label>
            Email:
            <br />
            <input
              name="email"
              type="text"
              placeholder="Example: jackson11@email.com"
              onChange={this.change}
              maxLength="60"
            />
          </label>
          <div>For authentication reasons, you will not be emailed</div>
          <br />
          <br />
          <button name="submit-form" onClick={this.submitReview}>
            Submit Review
          </button>
          <button
            name="close-form"
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            Close Form
          </button>
        </form>
      </div>
    );
  }
}

// productId is coming from props
