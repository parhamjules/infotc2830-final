const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/register', unauthenticated, (req, res) => {
  const errors = app.locals.errors;
  app.locals.errors = {};
  renderTemplate(res, 'auth/register', { errors });
});

app.post('/register', unauthenticated, (req, res) => {
  let errors = {};
  if(!req.body.username) errors.username = 'Username is required.';
  if(!req.body.password) errors.password = 'Password is required.';
  app.locals.errors = errors;
  if(errors.username || errors.password) {
    res.redirect('/register');
  } else {
    User.findByUsername(req.body.username).then(async found => {
      if(!found) {
        const passwordHash = await bcrypt.hash(req.body.password, 8);
        const user = new User({username: req.body.username, password: passwordHash});
        user.save().then(newUser => {
          req.session.currentUser = newUser;
          res.redirect('/');
        });
      } else {
        app.locals.errors.username = 'That username is already taken. Please choose another.';
        res.redirect('/register');
      }
    });
  }
});
