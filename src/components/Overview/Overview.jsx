/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import OverviewDetails from './OverviewDetails.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      category: '',
      name: '',
      price: '',
      style: '',
    };
    this.getProductInfo = this.getProductInfo.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo() {
    axios.get(`/products/${this.state.id}`)
      .then((product) => {
        this.setState({
          category: product.data.category,
          name: product.data.name,
          price: product.data.default_price.slice(0, product.data.default_price.indexOf('.')),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <a>Read all reviews</a>
        <br />
        <span>{this.state.category.toUpperCase()}</span>
        <h3>{this.state.name}</h3>
        <span>${this.state.price}</span>
        <OverviewDetails />
      </div>
    );
  }
}

export default Overview;
