'use strict'
const Prop    = require('../models/prop');
const User    = require('../models/user');
const mongoose = require('mongoose');

class PropsController {
  
  static createProp(req, res) {
    console.log('creating')
    let newProp = JSON.parse(req.body.detailProp)
    newProp.owner = req.headers.decoded._id
    newProp.images = req.files.imagePostUrls
    newProp.createdAt = new Date()
    console.log(newProp)
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

  static searchAllProps(req, res) {
    console.log(req.query.field)
    Prop.find({$text: {$search: req.query.field}})
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

  static getPropById (req, res) {
    console.log('getting prop by ID .....................', req.params.id)
    Prop.findOne({_id: req.params.id})
    .populate('owner')
    .then(propData => {
      if(propData !== null) {
        res.status(200).json({
          message: 'Property found!',
          data: propData
        })
      } else {
        res.status(202).json({
          message: 'Property not found!',
          data: propData
        })
      }
    })
    .catch(err => {
      console.log(err)
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
    // console.log(req.files.imagePostUrls.length,'=========')
    if (req.files.imagePostUrls && req.files.imagePostUrls.length !== 0) {
      data.images = req.files.imagePostUrls
    }
    
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