const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')
const router = Router()
const { createUser, login, verifyEmail } = require('../controllers/auth')

// Rutas
router.post(
  '/register',
  [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    check('investmentAmount').optional(),
    fieldValidator
  ], //middleware
  createUser
)

router.post(
  '/',
  [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    check('investmentAmount').optional(),
    fieldValidator
  ],
  login
)

router.get('/verify/:token', verifyEmail)

module.exports = router;