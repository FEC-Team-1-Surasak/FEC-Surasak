/* eslint-disable react/prop-types */
import React from 'react';

const SortDropdown = ({ getReviews }) => (
  <select className="sort-dropdown" onChange={(e) => getReviews(e.target.value)} name="selectSize" id="selectSize">
    <option value="relevant"> Relevance &#9662; </option>
    <option value="newest"> Newest</option>
    <option value="helpfulness"> Helpfulness</option>
  </select>
);

export default SortDropdown;
