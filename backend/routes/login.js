const express = require('express');
const User = require('../models/User');
const { authenticated, unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/login', unauthenticated, (req, res) => renderTemplate(res, 'auth/login'));

app.post('/login', unauthenticated, (req, res) => {
  User.findByCreds(req.body.username, req.body.password).then(user => {
    if(user) req.session.currentUser = user;
    res.redirect('/');
  });
});

app.get('/logout', authenticated, (req, res) => {
  req.session.currentUser = null;
  res.redirect('/login');
});
