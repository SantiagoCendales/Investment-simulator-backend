const {Schema, model} = require('mongoose')

const ProjectSchema = Schema({
  name: {
    type: String,
    require: true
  },
  returnPerYear: {
    type: Number,
    require: true
  },
  appreciationPerYear: {
    type: Number,
    require: true
  },
  unitPrice: {
    type: Number,
    require: true
  },
  profitability: {
    type: Array,
    required: false
  }
})

module.exports = model('Project', ProjectSchema)