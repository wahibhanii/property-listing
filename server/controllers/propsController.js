'use strict'
const Prop    = require('../models/Prop');
const User    = require('../models/user');
const mongoose = require('mongoose');

class PropsController {
  
  static createProp(req, res) {
    let newProp = {
      caption     : req.body.caption,
      urlToImage  : req.file.imagePropUrl,
      owner       : req.headers.decoded._id ,

    
      createdAt   : new Date()
    }
    Prop.create(newProp)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message : 'Create Prop successful!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static getAllProps(req, res) {
    console.log('get all Props ===============================================')
    Prop.find({})
    .sort({createdAt: 'desc'})
    .exec()
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  

  static getUserProps(req, res){
    Prop.find({owner: req.params.id}).sort({createdAt: 'desc'}).exec()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static editProp(req, res) {
    let data = JSON.parse(req.body.update)
    console.log(data)
    Prop.findOneAndUpdate({_id:req.params.id}, data, {new: true})
    .then(result => {
      res.status(200).json({
        message: 'Prop edited!',
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static deleteProp (req, res) {
    console.log(req.params.id, 'deleting----------------------')
    Prop.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete Prop successful!',
        data    : result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  
}

module.exports = PropsController