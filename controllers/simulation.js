const { response } = require('express')
const Project = require('../models/Project')
const generateSimulation = async(req, res = response) => {

  try {

    const { investmentValue, projectId} = req.body

    const project = await Project.findById(projectId)

    if(!project) {
      return res.status(400).json({
        ok: false,
        msg: "Este proyecto no existe"
      })
    }

    const parseInvestmentValue = Number(investmentValue)

    const calculatedValues = project.profitability.map((data) => {
      return {
        ...data,
        simulatedreturn: data.return *  parseInvestmentValue / 100,
        simulatedAppreciation: data.appreciation * parseInvestmentValue / 100
      }
    })

    res.status(201).json({
      ok: true,
      totalInvestment: parseInvestmentValue,
      simulation: calculatedValues
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
  generateSimulation
}