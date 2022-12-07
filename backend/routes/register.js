const express = require('express');
const Users = require('../db/tables/Users');
const { unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/register', unauthenticated, (req, res) => renderTemplate(res, 'auth/register'));

app.post('/register', unauthenticated, (req, res) => {
  res.redirect('/');
});
