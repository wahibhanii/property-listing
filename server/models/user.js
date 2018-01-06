'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email       : String,
  password    : String,
  userName    : String,
  profPicUrl  : String,
  phone       : String,
  address     : String, 
  savedProps  : [{type: Schema.Types.ObjectId, ref: 'Prop'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;