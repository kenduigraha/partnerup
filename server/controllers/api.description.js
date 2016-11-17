'use strict'

const Data = require('../models/api.description')
const seeder = require('../seeder/api.description.json')

let newDescription = (req, res) => {
  Data.create({
    letter: req.body.letter,
    frequency: req.body.frequency
  }, (err, new_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(new_data)
    }
  })
}

let showAllDescription = (req, res) => {
  Data.find({}, (err, all_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(all_data)
    }
  }).sort({_id: -1})
}

let editDescription = (req, res) => {
  Data.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (err, updated_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(updated_data)
    }
  })
}

let deleteDescription = (req, res) => {
  Data.findOneAndRemove({
    _id: req.params.id
  }, (err, deleted_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(deleted_data)
    }
  })
}

let seedDescription = (req, res) => {
  Data.create(seeder, (err, seeder_data) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(seeder_data)
    }
  })
}

let deleteAllDescription = (req, res) => {
  Data.remove({}, (err, remove_all) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json(remove_all)
    }
  })
}

module.exports = {
  newDescription,
  showAllDescription,
  editDescription,
  deleteDescription,
  seedDescription,
  deleteAllDescription
}
