const { Router } = require('express')
const router = Router()
const { getProjects } = require('../controllers/project')


router.get(
  '/',
  getProjects
)

module.exports = router;