/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.currentStyle.skus === undefined || this.props.currentStyle.skus === null) {
      return <div />;
    }
    return (
      <select name="selectList" id="selectList">
        <option value="placeholder">Select Size</option>
        {Object.keys(this.props.currentStyle.skus).map(sku => {
          const size = this.props.currentStyle.skus[sku].size;
          const qty = this.props.currentStyle.skus[sku].quantity;
          if (qty !== 0) {
            return <option value={size}>{size}</option>;
          }
        })}
      </select>
    );
  }
}

export default AddToCart;
