'use strict'

const passport = require('passport')
const User = require('../models/api.user')
const jwt = require('jsonwebtoken')

let newUser = (req, res, next) => {
  User.register({
    username: req.body.username,
    email: req.body.email
  },req.body.password, (err, new_user) => {
    if(err){
      res.status(400).json(err)
    }else {
      passport.authenticate('local', {}, (err, user, info) => {
        if(err){
          return res.status(400).json(err)
        }else{
          return res.status(200).json({
            token: jwt.sign({
              sub: user._id,
              username: user.username,
              email: user.email
            }, 'secret', { expiresIn: '1h' })
          })
        }
      })(req, res, next)
    }
  })
}

let loginUser = (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    if(err){
      return res.status(400).json(err)
    }else{
      return res.status(200).json({
        token: jwt.sign({
          sub: user._id,
          username: user.username,
          email: user.email
        }, 'secret', { expiresIn: '1h' })
      })
    }
  })(req, res, next)
}

module.exports = {
  newUser,
  loginUser
}
