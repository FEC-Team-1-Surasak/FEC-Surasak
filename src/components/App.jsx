/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
<<<<<<< HEAD
import RatingsReviews from './Ratings_Reviews/RatingsReviews';
=======
import Overview from './Overview/Overview.jsx';
>>>>>>> f1d482ba4f9f839477795dcccd60f4b2a487959a

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      id: null,
    };
    this.getRandomProduct = this.getRandomProduct.bind(this);
  }

  componentDidMount() {
    this.getRandomProduct();
  }

  getRandomProduct() {
    axios.get('/products')
      .then((products) => {
        const number = products.data.length;
        const itemNumber = Math.floor(Math.random() * (number));
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          id: products.data[itemNumber].id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
<<<<<<< HEAD
    const { id } = this.state;
    return (
      <div>
        <RatingsReviews productId={id} />
      </div>
=======
    if (this.state.id === null) {
      return <div></div>;
    }

    return (
      <>
        <div>Hello, World</div>
        <Overview id={this.state.id} />
      </>
>>>>>>> f1d482ba4f9f839477795dcccd60f4b2a487959a
    );
  }
}
