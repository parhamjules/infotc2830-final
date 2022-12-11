const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { authenticated, unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/login', unauthenticated, (req, res) => renderTemplate(res, 'auth/login'));

app.post('/login', unauthenticated, (req, res) => {
  User.findByUsername(req.body.username).then(async user => {
    if(user && await bcrypt.compare(req.body.password, user.password)) {
      req.session.currentUser = user;
    }
    res.redirect('/');
  });
});

app.get('/logout', authenticated, (req, res) => {
  req.session.currentUser = null;
  res.redirect('/login');
});
