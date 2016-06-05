const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var router = module.exports = exports = express.Router();

router.post('/signup', jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({msg: 'you probably don\'t want a blank password'});

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({msg: 'could not create user'});

    user.generateToken(function(err, token) {
      if (err) return res.status(500).json({msg: 'could not generate token, sign in later'});

      res.json({token});
    });
  });
});

router.get('/signin', basicHTTP, (req, res) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err) return res.status(500).json({msg: 'authenticat seyz no!'});

    if (!user) return res.status(500).json({msg: 'authenticat seyz no!'});

    if (!user.compareHash(req.auth.password)) return res.status(500).json({msg: 'authenticat seys no'});

    user.generateToken(function(err, token) {
      if (err) return res.status(500).json({msg: 'could not generate token, sign in later'});

      res.json({token});
    });
  });
});

router.get('/profile', jwtAuth, function(req, res) {
  res.send({username: req.user.username});
});
