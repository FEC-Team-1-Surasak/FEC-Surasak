/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: '',
      size: '',
      quantity: '',
      bagQty: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addToCart({
      name: this.props.product.name,
      style: this.props.currentStyle.name,
      size: this.state.size,
      qty: this.state.bagQty,
    });
  }

  render() {
    if (this.props.currentStyle.skus === undefined || this.props.currentStyle.skus === null) {
      return <div />;
    }

    const qtyCount = [];
    if (this.state.quantity < 15) {
      for (let i = 2; i <= this.state.quantity; i++) {
        qtyCount.push(i);
      }
    } else {
      for (let i = 2; i <= 15; i++) {
        qtyCount.push(i);
      }
    }

    return (
      <>
        <select onChange={(e) => { this.setState({ sku: e.target.value, quantity: this.props.currentStyle.skus[e.target.value].quantity, size: this.props.currentStyle.skus[e.target.value].size }); }} >
          <option>Select Size</option>
          {Object.keys(this.props.currentStyle.skus).map(sku => {
            const size = this.props.currentStyle.skus[sku].size;
            const qty = this.props.currentStyle.skus[sku].quantity;
            if (qty !== 0) {
              return <option value={sku}>{size}</option>;
            }
          })}
        </select>
        {' '}
        <select onChange={(e) => { this.setState({ bagQty: e.target.value }); }}>
          <option>{this.state.size === '' ? '-' : 1}</option>
          {qtyCount.map(digit => {
            return <option value={digit}>{digit}</option>;
          })}
        </select>
        <br />
        <button onClick={this.handleClick}>
          Add to Cart
        </button>
      </>
    );
  }
}

export default AddToCart;
