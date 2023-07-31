const {Schema, model} = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  phone: {
    type: String,
    require: true,
  },
  howKnow: {
    type: String,
    require: false,
  },
  referralCode: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: true
  },
  acceptTermsAndConditions: {
    type: Boolean,
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