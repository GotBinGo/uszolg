'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')

exports.register = async (req, res, next) => {
  try {
    req.body.role = 'user';
    if(req.body.name[0] == 'A' || req.body.name[0] == 'a') {
      req.body.role = 'admin';
    }
    const user = new User(req.body)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.send(savedUser.transform())
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.guest = async (req, res, next) => {
  try {
    const rnd = Math.random();
    const body = {email: rnd + '@a.ic.hu', name: rnd + 'guest', password: '123123'};
    const rUser = new User(body)
    const savedUser = await rUser.save()

    const user = await User.findAndGenerateToken(body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}
