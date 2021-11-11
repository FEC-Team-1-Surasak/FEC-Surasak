/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export default class SvgStar extends Component {
  render() {
    const { color } = this.props;
    return (
      <svg width="1rem" height="1rem" viewBox="0 0 98 92" fill={color}>
        <path stroke={color} strokeWidth="10" d="M49 73.5L22.55 87.406l5.05-29.453-21.398-20.86 29.573-4.296L49 6l13.225 26.797 29.573 4.297-21.4 20.86 5.052 29.452z" fillRule="evenodd" />
      </svg>
    );
  }
}
