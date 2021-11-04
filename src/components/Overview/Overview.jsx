/* eslint-disable react/sort-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import ProductDescription from './ProductDescription.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import StarRatingStatic from '../Ratings_Reviews/subcomponents/StarRatingStatic.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      // id: 37326,
      product: {},
      styles: [],
      currentStyle: {},
      category: '',
      price: '',
      isOnSale: '',
      cart: [],
    };
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
    this.getStyles();
  }

  getProductInfo() {
    axios.get(`/products/${this.state.id}`)
      .then((product) => {
        this.setState({
          product: product.data,
          category: product.data.category,
          price: product.data.default_price.slice(0, product.data.default_price.indexOf('.')),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getStyles() {
    axios.get(`/products/${this.state.id}/styles`)
      .then((styleList) => {
        this.setState({
          styles: styleList.data.results,
          currentStyle: styleList.data.results[0],
          isOnSale: !!styleList.data.results[0].sale_price,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateStyle(style) {
    this.setState({
      currentStyle: style,
      isOnSale: !!style.sale_price,
    });
  }

  addToCart(item) {
    this.setState({
      cart: [...this.state.cart, {
        name: item.name,
        style: item.style,
        size: item.size,
        qty: item.qty,
      }],
    });
  }

  render() {
    let price;
    if (this.state.isOnSale) {
      price = (
        <>
          <span style={{ color: 'red' }}>${this.state.currentStyle.sale_price.slice(0, this.state.currentStyle.sale_price.indexOf('.'))}</span> {' '}
          <span style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
            ${this.state.currentStyle.original_price.slice(0, this.state.currentStyle.original_price.indexOf('.'))}
          </span>
        </>
      );
    } else if (this.state.currentStyle.original_price !== undefined) {
      price = <span>${this.state.currentStyle.original_price.slice(0, this.state.currentStyle.original_price.indexOf('.'))}</span>;
    }

    if (this.state.currentStyle === undefined) {
      return <div />;
    }

    return (
      <div>
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        {/* <StarRatingStatic /> */}
        <a>Read all reviews</a>
        <br />
        <span>{this.state.category.toUpperCase()}</span>
        <h2>{this.state.product.name}</h2>
        {price}
        <StyleSelector
          styles={this.state.styles}
          currentStyle={this.state.currentStyle}
          updateStyle={this.updateStyle}
        />
        <AddToCart
          currentStyle={this.state.currentStyle}
          addToCart={this.addToCart}
          product={this.state.product}
        />
        <ProductDescription product={this.state.product} />
      </div>
    );
  }
}

export default Overview;
