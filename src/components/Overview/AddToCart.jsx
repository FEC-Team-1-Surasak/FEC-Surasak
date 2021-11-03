/* eslint-disable react/sort-comp */
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
      // currentStyle: this.props.currentStyle,
      sku: '',
      size: '',
      quantity: null,
      bagQty: 1,
      selectSize: true,
      inStock: true,
    };

    // this.updateStyle = this.updateStyle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.outOfStock = this.outOfStock.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.currentStyle !== this.props.currentStyle) {
  //     this.updateStyle(this.props.currentStyle);
  //   }
  // }

  // updateStyle(style) {
  //   console.log(style);
  //   this.setState({
  //     currentStyle: style,
  //   });
  // }

  handleClick() {
    if (this.state.size) {
      this.setState({
        selectSize: true,
      });
    } else {
      this.setState({
        selectSize: false,
      });
    }
    this.props.addToCart({
      name: this.props.product.name,
      style: this.props.currentStyle.name,
      size: this.state.size,
      qty: this.state.bagQty,
    });
  }

  handleChange(e) {
    this.setState({
      sku: e.target.value,
      quantity: this.props.currentStyle.skus[e.target.value].quantity,
      size: this.props.currentStyle.skus[e.target.value].size,
      selectSize: true,
      inStock: this.props.currentStyle.skus[e.target.value].quantity !== 0,
    });
  }

  outOfStock() {
    this.setState({
      inStock: false,
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
        <div>{this.state.selectSize ? '' : 'Please select size'}</div>
        <select onChange={this.handleChange}>
          <option>Select Size</option>
          {Object.keys(this.props.currentStyle.skus).map(sku => {
            const size = this.props.currentStyle.skus[sku].size;
            const qty = this.props.currentStyle.skus[sku].quantity;
            if (qty !== 0) {
              return <option key={size} value={sku}>{size}</option>;
            }
          })}
        </select>
        {' '}
        <select
          onChange={(e) => { this.setState({ bagQty: e.target.value }); }}
        >
          <option>{this.state.size === '' ? '-' : 1}</option>
          {qtyCount.map(digit => {
            return <option value={digit}>{digit}</option>;
          })}
        </select>
        <br />
        <div>
          {this.state.inStock ? <button onClick={this.handleClick}>Add to Cart</button> : null}
        </div>
      </>
    );
  }
}

export default AddToCart;
