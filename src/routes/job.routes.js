const { Router } = require('express')
const router = Router()
const jobCtrl = require('../controllers/job.controller')
const { getAllSolicitudesByJobId } = require('../controllers/solicitud.controller')
const { authMdlw } = require('../middlewares/auth.middleware')

router.get('/', jobCtrl.getAllJobs)

router.get('/owner', authMdlw, jobCtrl.getAllJobsByOwner)

router.get('/:id', jobCtrl.getJobById)

router.get('/:idjob/solicitud', authMdlw, getAllSolicitudesByJobId)

router.get('/category/:ctgrtittle', jobCtrl.getJobsByCategory)

router.post('/', authMdlw, jobCtrl.createJob)

router.put('/', authMdlw, jobCtrl.updateJob)

router.put('/:id/view', jobCtrl.updateViewJob)

router.delete('/:id', authMdlw, jobCtrl.deleteJob)


module.exports = router