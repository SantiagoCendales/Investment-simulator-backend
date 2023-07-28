const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const createUser = async(req, res = response) => {

  try {

    const { email, password } = req.body

    let user = await User.findOne(({email}))
    console.log(user)

    if(user) {
      return res.status(400).json({
        ok: false,
        msg: 'Este correo ya esta registrado'
      })
    }

    // User creation
    user = new User(req.body)

    // Password encrypt
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error 500 internal server error"
    })
    console.log(error)
  }
}

const login = (req, res = response) => {

  const { email, password } = req.body

  res.json({
    ok: true,
    msg: "login",
    email,
    password
  })
}

module.exports = {
  createUser,
  login
}