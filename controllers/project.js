const { response } = require('express')
const Project = require('../models/Project')

const getProjects = async(req, res = response) => {

  try {
    let projects = await Project.find({})

    res.status(201).json({
      ok: true,
      projects,
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
  getProjects
}