'use strict'

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema ({
  "username" : String,
  "password" : String,
  "email"  : String,
  "photo" : String,
  "location" : {
    "lat" : String,
    "lng" : String
  }
},{
  "timestamps" : true
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Users', UserSchema)
