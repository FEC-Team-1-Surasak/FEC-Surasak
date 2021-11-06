/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';
import Container from './Ratings_Reviews/Container.jsx';
import Questions from './QA/questions.jsx';
import EventTracking from './EventTracking.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: null,
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
          id: products.data[itemNumber].id,
          name: products.data[itemNumber].name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.id === null) {
      return <div> </div>;
    }
    return (
      <div>
        {/* <Overview id={this.state.id} /> */}
        <Questions name={this.state.name} id={this.state.id} />
        {/* <Container productId={this.state.id} /> */}
      </div>
    );
  }
}
