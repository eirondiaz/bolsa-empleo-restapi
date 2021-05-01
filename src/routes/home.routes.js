const { Router } = require('express')
const router = Router()
const homeCtrl = require('../controllers/home.controller')

router.get('/', homeCtrl.indexPage)

//router.get('/docs', homeCtrl.docsPage)

module.exports = router