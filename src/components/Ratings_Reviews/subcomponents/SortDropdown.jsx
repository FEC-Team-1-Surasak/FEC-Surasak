/* eslint-disable react/prop-types */
import React from 'react';

const SortDropdown = ({ getReviews }) => (
  <select onChange={(e) => getReviews(e.target.value)} name="selectSize" id="selectSize">
    <option value="relevant">Relevant</option>
    <option value="newest">Newest</option>
    <option value="helpfulness">Helpfulness</option>
  </select>
);

export default SortDropdown;
