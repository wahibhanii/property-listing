'use strict'
const User = require('../models/user');
const bcrypt      = require('bcryptjs');
const salt        = bcrypt.genSaltSync(10);
const jwt         = require('jsonwebtoken');

class UserController {

  static createUser(req, res) {
    let newUser = {
      email       : req.body.email,
      userName    : req.body.userName,
      password    : bcrypt.hashSync(req.body.password, salt),
      profPicUrl  : null,
      following   : [],
      followers   : []
    }
    User.findOne({email: req.body.email})
    .then(userResult => {
      if (userResult === null){
        return  User.create(newUser)
      } else {
        res.status(202).json({
          message: 'Email already in use, forgot password?'
        })
      }
    })
    .then(result => {
      res.status(200).json({
        message : 'Create new User success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static login(req, res) {
    User.findOne({email: req.body.email})
    .then(userResult => {
      if (userResult === null) {
        console.log('User not found')
        res.status(204).json({
          message : 'User not found!',
          isLoggedIn : false,
        })
      } else {
        if (bcrypt.compareSync(req.body.password, userResult.password)){
          console.log('Login Success!')
          let payload = {
            _id  : userResult._id,
            email    : userResult.email,
            userName  : userResult.userName
          }
          let token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
          res.status(200).json({
            message : 'Login Success!',
            token    : token,
            isLoggedIn : true,
          })
  
        } else {
          console.log('Wrong Password, login fail')
          res.status(202).json({
            message: 'Wrong Password, login fail',
            isLoggedIn : false,
          })
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static findAllUsers(req, res) {
    User.find({})
    .then(dataUsers => {
      res.status(200).json({
        message  : 'Users found!',
        data     : dataUsers
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static findUserById(req, res) {
    User.findOne({_id: req.params.id})
    .then(dataUser => {
      if (dataUser === null){
        res.status(204).json({
          message: 'User not found!'
        })
      } else {
        res.status(200).json({
          message  : 'User found!',
          data     : dataUser
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static updateUser(req, res){
    let data = JSON.parse(req.body.update)
    User.findOneAndUpdate({_id:req.params.id}, data, {new: true})
    .then(result => {
      res.status(200).json({
        message: 'User data updated!',
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static deleteUser (req, res) {
    User.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete User entry success!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

}

module.exports = UserController;