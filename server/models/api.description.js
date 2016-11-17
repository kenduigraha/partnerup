'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema

let DescriptionSchema = new Schema ({
  "title" : String,
  "content" : String,
  "looking_for" : String,
  "username" : String,
  "photos" : String,
  "location" : {
    "lat" : String,
    "lng" : String
  }
},{
  "timestamps" : true
  })


module.exports = mongoose.model('Descriptions', DescriptionSchema)
