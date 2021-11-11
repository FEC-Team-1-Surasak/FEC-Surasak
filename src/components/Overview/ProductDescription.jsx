/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function ProductDescription(props) {
  if (props.product.features === undefined) {
    return <div></div>;
  }
  return (
    <div className="product-description-container">
      <h4 className="product-slogan">{props.product.slogan}</h4>
      <p className="product-description">{props.product.description}</p>
      <ul className="product-features">
        {props.product.features.map(feature => {
          return <li>{feature.value} {feature.feature}</li>;
        })}
      </ul>
    </div>
  );
}

export default ProductDescription;
