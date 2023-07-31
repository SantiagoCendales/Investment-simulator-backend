const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { generateJWT } = require('../helpers/jwt')
const sentVerificationEmail = require('../services/mail')

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
    user.verificationToken = crypto.randomBytes(32).toString('hex')

    await user.save()

    const token = await generateJWT(user.id, user.name)
    
    await sentVerificationEmail(user.email, user.verificationToken, req.body.investmentAmount)

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

const verifyEmail = async(req, res) => {
  try {
    const user = await User.findOne({verificationToken: req.params.token})

    if(!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Link inválido'
      })
    }

    await User.updateOne({verificationToken: user.verificationToken, emailVerified: true})

    

    res.status(200).json({
      ok: true,
      msg: "Verificación exitosa"
    })

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  login,
  verifyEmail
}