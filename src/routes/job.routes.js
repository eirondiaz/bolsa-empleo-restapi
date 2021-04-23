const { Router } = require('express')
const router = Router()
const jobCtrl = require('../controllers/job.controller')
const { authMdlw } = require('../middlewares/auth.middleware')

router.get('/', jobCtrl.getAllJobs)

router.get('/:id', jobCtrl.getJobById)

router.get('/owner', authMdlw, jobCtrl.getAllJobsByOwner)

router.post('/', authMdlw, jobCtrl.createJob)

router.put('/', authMdlw, jobCtrl.updateJob)

router.delete('/:id', authMdlw, jobCtrl.deleteJob)

module.exports = router