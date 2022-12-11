const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { authenticated, unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/login', unauthenticated, (req, res) => {
  const errors = app.locals.errors;
  app.locals.errors = {};
  renderTemplate(res, 'auth/login', { errors });
});

app.post('/login', unauthenticated, (req, res) => {
  let errors = {};
  if(!req.body.username) errors.username = 'Username is required.';
  if(!req.body.password) errors.password = 'Password is required.';
  app.locals.errors = errors;
  if(errors.username || errors.password) {
    res.redirect('/login');
  } else {
    User.findByUsername(req.body.username).then(async user => {
      if(user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.currentUser = user;
      } else {
        app.locals.errors.password = 'Your login credentials are incorrect.';
      }
      res.redirect('/');
    });
  }
});

app.get('/logout', authenticated, (req, res) => {
  req.session.currentUser = null;
  res.redirect('/login');
});
