const { Router } = require('express')
const router = Router()
const jobCtrl = require('../controllers/job.controller')
const { authMdlw } = require('../middlewares/auth.middleware')

router.get('/', authMdlw, jobCtrl.getAllJobs)

router.get('/:id', authMdlw, jobCtrl.getJobById)

router.post('/', authMdlw, jobCtrl.createJob)

router.put('/', authMdlw, jobCtrl.updateJob)

router.delete('/:id', authMdlw, jobCtrl.deleteJob)

module.exports = router