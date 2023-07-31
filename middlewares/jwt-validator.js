const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const validateJWT = (req, res = response, next) => {

  const token = req.header('x-token')
  console.log(token)

  if(!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Sin token'
    })
  }

  try {
    
    const payload = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )

    const user = User.findOne({name: payload.name})
    console.log(user.name)

    console.log(payload)

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido'
    })
  }

  next()

}

module.exports = {
  validateJWT
}