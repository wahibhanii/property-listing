'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propSchema = new Schema({
  caption     : String,
  images      : [String], // array of URLs to image
  owner       : {type: Schema.Types.ObjectId, ref: 'User'},
  type        : String, // land, house, apartment
  status      : String, // 
  location    : Schema.Types.Mixed,
  address     : String,    
  price       : Number,
  buildingArea: Number,
  landArea    : Number,
  bedroomCount: Number,
  bathroomCount: Number,
  createdAt   : Date
});

const Prop = mongoose.model('Prop', propSchema);

module.exports = Prop; 