const { Router } = require('express')
const router = Router()
const solicitudCtrl = require('../controllers/solicitud.controller')
const { authMdlw } = require('../middlewares/auth.middleware')

router.get('/', authMdlw, solicitudCtrl.getAllSolicitudByUser)

router.get('/:id', authMdlw, solicitudCtrl.getSolicitudById)

router.post('/', authMdlw, solicitudCtrl.createSolicitud)

module.exports = router