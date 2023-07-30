const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req, res = response) => {

  try {

    const { email, password } = req.body

    let user = await User.findOne(({email}))

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

    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error 500 internal server error"
    })
    console.log(error)
  }
}

const login = async(req, res = response) => {

  try {
    
    const { email, password } = req.body

    const user = await User.findOne(({ email }))

    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario no registrado'
      })
    }

    // Confirm password
    const validPassword = bcrypt.compareSync( password, user.password)

    if(!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta"
      })
    }

    // Generar JWT
    const token = await generateJWT(user.id, user.name)

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error 500 internal server error"
    })
    console.log(error)
  }

}

module.exports = {
  createUser,
  login
}