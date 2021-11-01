/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const config = require('../config');

const app = express();

app.use(morgan('combined'));
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

app.get('/reviews/meta/:product_id', (req, res) => {
  console.log('req.params!', req.params.product_id);
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta?product_id=${req.params.product_id}`, options)
    .then((reviews) => {
      res.status(200).json(reviews.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/reviews/:product_id/:filter', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews?product_id=${req.params.product_id}&count=1000&sort=${req.params.filter}`, options)
    .then((reviews) => {
      res.status(200).json(reviews.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = app;
