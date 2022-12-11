const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { unauthenticated } = require('../middlewares');
const { renderTemplate } = require('../helpers');
const app = module.exports = express();

app.get('/register', unauthenticated, (req, res) => renderTemplate(res, 'auth/register'));

app.post('/register', unauthenticated, (req, res) => {
  User.findByUsername(req.body.username).then(async found => {
    if(!found) {
      const passwordHash = await bcrypt.hash(req.body.password, 8);
      const user = new User({username: req.body.username, password: passwordHash});
      user.save().then(newUser => {
        req.session.currentUser = newUser;
        res.redirect('/');
      });
    } else {
      res.redirect('/register');
    }
  });
});
