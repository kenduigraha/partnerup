'use strict'

const passport = require('passport')
const User = require('../models/api.user')
const jwt = require('jsonwebtoken')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, `public/photos`)
  },
  filename: function (req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage }).single('photo')


let newUser = (req, res, next) => {
  upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.json('Error uploading file!', err)
      }
      else if (req.file.filename) {
          // res.end(`${req.file.filename}`)
        User.register({
          username: req.body.username,
          email: req.body.email,
          photo: req.file.filename
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
                    email: user.email,
                    photo: user.photo,
                    location: {
                      lat: user.location.lat,
                      lng: user.location.lng
                    }
                  }, "secret", { expiresIn: '1h' })
                })
              }
            })(req, res, next)
          }
        })
      }
      else {
          res.json('Error no file!', err)
      }
  })


}

let loginUser = (req, res, next) => {
  passport.authenticate('local', {}, (err, user, info) => {
    if(err){
      return res.status(400).json(err)
    }else{
      console.log(user);
      return res.status(200).json({
        token: jwt.sign({
          sub: user._id,
          username: user.username,
          email: user.email,
          photo: user.photo
          // location: {
          //   lat: user.location.lat,
          //   lng: user.location.lng
          // }
        }, "secret", { expiresIn: '1h' })
      })
    }
  })(req, res, next)
}


module.exports = {
  newUser,
  loginUser
}
