/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const axios = require('axios');
const config = require('../config');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const options = {
  headers: {
    Authorization: config.API_KEY,
  },
};

app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products?page=1&count=30', options)
    .then((products) => {
      res.status(200).json(products.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/products/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${req.params.product_id}`, options)
    .then((product) => {
      res.status(200).json(product.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = app;
