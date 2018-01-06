'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propSchema = new Schema({
  caption     : String,
  images      : [String], // array of URLs to image
  owner       : {type: Schema.Types.ObjectId, ref: 'User'},
  location    : Schema.Types.Mixed,
  price       : Number,
  createdAt   : Date
});

const Prop = mongoose.model('Prop', propSchema);

module.exports = Prop; 