/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

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
    return <div>Hello World!</div>;
  }
}
