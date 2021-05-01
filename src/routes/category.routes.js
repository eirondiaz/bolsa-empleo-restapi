const { Router } = require('express')
const router = Router()
const { authMdlw } = require('../middlewares/auth.middleware')
const ctgyCtrl = require('../controllers/category.controller')

router.get('/', ctgyCtrl.getAllCategories)

router.get('/:title', ctgyCtrl.getCategoryByTitle)

router.post('/', authMdlw, ctgyCtrl.createCategory)

router.put('/', authMdlw, ctgyCtrl.updateCategory)

router.delete('/:id', authMdlw, ctgyCtrl.deleteCategory)

module.exports = router