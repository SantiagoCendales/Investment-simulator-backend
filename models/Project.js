const {Schema, model} = require('mongoose')

const ProjectSchema = Schema({
  name: {
    type: String,
    require: true
  },
  profitability: {
    type: Number,
    require: true,
  },
})

module.exports = model('Project', ProjectSchema)