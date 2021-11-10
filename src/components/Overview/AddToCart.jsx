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
      currentStyle: this.props.currentStyle,
      sku: '',
      size: '',
      quantity: null,
      bagQty: 1,
      selectSize: true,
      isOutOfStock: false,
    };

    this.updateStyle = this.updateStyle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isOutOfStock = this.isOutOfStock.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({
        currentStyle: this.props.currentStyle,
      }), 1000,
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.updateStyle(this.props.currentStyle);
    }
  }

  updateStyle(style) {
    this.setState({
      currentStyle: style,
      sku: '',
      size: '',
      quantity: null,
      isOutOfStock: this.isOutOfStock(style.skus),
    });
  }

  handleClick() {
    if (this.state.size) {
      alert(`${this.state.bagQty}x ${this.props.currentStyle.name} ${this.props.product.name} in ${this.state.size} added to cart!`);
      this.props.addToCart({
        name: this.props.product.name,
        style: this.props.currentStyle.name,
        size: this.state.size,
        qty: this.state.bagQty,
      });
    } else {
      this.setState({
        selectSize: false,
      });
    }
  }

  handleChange(e) {
    this.setState({
      sku: e.target.value,
      quantity: this.state.currentStyle.skus[e.target.value].quantity,
      size: this.state.currentStyle.skus[e.target.value].size,
      selectSize: true,
      inStock: this.isOutOfStock(this.state.currentStyle.skus),
    });
  }

  isOutOfStock(skus) {
    for (var key in skus) {
      if (skus[key].quantity > 0) {
        return false;
      }
    }
    return true;
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
        <select value={this.state.sku} onChange={this.handleChange}>
          <option>{this.state.isOutOfStock ? 'OUT OF STOCK' : 'Select Size'}</option>
          {Object.keys(this.props.currentStyle.skus).map((sku) => {
            const size = this.props.currentStyle.skus[sku].size;
            const qty = this.props.currentStyle.skus[sku].quantity;
            if (qty !== 0) {
              return <option value={sku}>{size}</option>;
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
          {this.state.isOutOfStock ? null : <button onClick={this.handleClick}>Add to Cart</button>}
        </div>
      </>
    );
  }
}

export default AddToCart;
