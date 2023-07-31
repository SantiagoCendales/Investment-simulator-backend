const {Schema, model} = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  emailVerified: {
    type: Boolean,
    require: true,
    default: false
  },
  verificationToken: {
    type: String,
    require: false
  }
})

module.exports = model('User', UserSchema)