/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const axios = require('axios');
const config = require('../config');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/products', (req, res) => {
  const options = {
    Authorization: config.API_KEY,
  };
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products?page=1&count=30', options)
    .then((products) => {
      console.log(products.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;
