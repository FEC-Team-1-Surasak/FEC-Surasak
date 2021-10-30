/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
  const options = {
    headers: {
      Authorization: config.API_KEY,
    },
  };
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products?page=1&count=30', options)
    .then((products) => {
      res.status(200).json(products.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get request handler for questions
app.get('/qa/questions', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${req.query.product_id}&count=${req.query.count}`, options)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log('err');
      res.status(500);
    });
});

// put reqeust handler for questions
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${req.body.question_id}/helpful`, null, options)
    .then(
      () => {
        res.status(204);
      },
    )
    .catch((err) => { console.log(err); });
});

// get request handler for answer list

app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${req.query.question_id}/answers`, options)
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log('err');
      res.status(500);
    });
});

// put requst handler for answer

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log(req.body.answer_id);
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${req.body.answer_id}/helpful`, null, options)
    .then(
      () => {
        console.log('update')
        res.status(204);
      },
    )
    .catch((err) => { console.log(err); });
});
module.exports = app;
