// Generated by CoffeeScript 1.10.0
(function() {
  var bcrypt, express, jwt, jwt_expire, jwt_secret, models, router, salt;

  express = require('express');

  router = express.Router();

  models = require('../models');

  bcrypt = require('bcryptjs');

  salt = bcrypt.genSaltSync(10);

  jwt = require('jsonwebtoken');

  jwt_secret = 'this is a bad secret';

  jwt_expire = 1000 * 60 * 60 * 24 * 1;

  router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        code: 2005,
        msg: 'missing username or password'
      }).end();
    }
    return models.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function(user) {
      var info, token;
      console.log('xxxxxxxxxxoooooooo');
      if (bcrypt.compareSync(req.body.password, user.password)) {
        info = {
          username: user.username,
          id: user.id
        };
        token = jwt.sign(info, jwt_secret, {
          expiresIn: jwt_expire
        });
        return res.json({
          id: user.id,
          username: user.username,
          token: token
        });
      } else {
        return res.status(401).json({
          code: 2004,
          msg: 'invalid username/password combination'
        }).end();
      }
    })["catch"](function(err) {
      console.log(err);
      return res.json({
        code: 2003,
        msg: err
      });
    });
  });

  router.post('/register', function(req, res, next) {
    var encrypted_pwd;
    if (!req.body.username || !req.body.password || !req.body.password_confirmation) {
      return res.status(400).json({
        code: 2001,
        msg: 'missing username or password or password_confirmation'
      }).end();
    }
    if (req.body.password !== req.body.password_confirmation) {
      return res.status(400).json({
        code: 2002,
        msg: 'password/password_confirmation not identical'
      }).end();
    }
    encrypted_pwd = bcrypt.hashSync(req.body.password, salt);
    return models.User.create({
      username: req.body.username,
      password: encrypted_pwd
    }).then(function(created_obj) {
      return res.json(created_obj);
    })["catch"](function(err) {
      return res.status(400).json({
        code: 2003,
        msg: err
      });
    });
  });

  module.exports = router;

}).call(this);
