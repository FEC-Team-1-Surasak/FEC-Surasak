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
      currentStyle: {},
      size: '',
      quantity: '',
    };
  }

  render() {
    if (this.props.currentStyle.skus === undefined || this.props.currentStyle.skus === null) {
      return <div />;
    }

    const qtyCount = [];
    if (this.state.quantity < 15) {
      for (let i = 1; i <= this.state.quantity; i++) {
        qtyCount.push(i);
      }
    } else {
      for (let i = 1; i <= 15; i++) {
        qtyCount.push(i);
      }
    }

    return (
      <>
        <select onChange={(e) => { this.setState({ size: e.target.value, quantity: this.props.currentStyle.skus[e.target.value].quantity }); }} name="selectSize" id="selectSize">
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
        <select name="selectQty" id="selectQty">
          <option> {this.state.size === '' ? '-' : 1} </option>
          {qtyCount.map(digit => {
            return <option value={digit}>{digit}</option>;
          })}
        </select>
      </>
    );
  }
}

export default AddToCart;
