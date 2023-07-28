const { response } = require('express')

const createUser = (req, res = response) => {
  const { name, email, password } = req.body
  
  console.log(req.body)
  res.json({
    ok: true,
    msg: 'Register',
    name,
    email,
    password
  })
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