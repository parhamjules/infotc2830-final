const express = require('express');
const User = require('../models/User');
const { unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/register', unauthenticated, (req, res) => renderTemplate(res, 'auth/register'));

app.post('/register', unauthenticated, (req, res) => {
  User.findByUsername(req.body.username).then(found => {
    if(!found) {
      const user = new User({username: req.body.username, password: req.body.password});
      user.save().then(newUser => {
        req.session.currentUser = newUser;
        res.redirect('/');
      });
    } else {
      res.redirect('/register');
    }
  });
});
