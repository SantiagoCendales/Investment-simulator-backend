const { Router } = require('express')
const router = Router()

const { createUser, login } = require('../controllers/auth')
// Rutas
router.post('/register', createUser)

router.post('/', login)

module.exports = router;