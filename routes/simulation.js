const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')
const router = Router()
const { generateSimulation } = require('../controllers/simulation')
const { validateJWT } = require('../middlewares/jwt-validator')


router.post(
  '/',
  // Middlewares
  [
    check('investmentValue', 'El valor de inversión es requerido').notEmpty().isInt({min: 10000000}).withMessage('El valor mínimo de inversión es de 11.200.000'),
    check('projectId', 'El id del proyecto es requerido').notEmpty(),
    fieldValidator,
    validateJWT
  ],
  generateSimulation
)

module.exports = router;
