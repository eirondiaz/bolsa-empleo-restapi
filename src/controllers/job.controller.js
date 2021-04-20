const Job = require('../models/job.model')
const Category = require('../models/category.model')

// @desc        get all jobs
// @route       GET /api/job
// @access      private GLOBAL
exports.getAllJobs = async (req, res) => {
    try {
        let _jobs = await Job.find()

        return res.status(200).json({ok: true, data: _jobs})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get a job by id
// @route       GET /api/job/:id
// @access      private GLOBAL
exports.getJobById = async (req, res) => {
    try {
        let _job = await Job.findOne({_id: req.params.id})

        return res.status(200).json({ok: true, data: _job})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        create a job
// @route       POST /api/job
// @access      private POSTER
exports.createJob = async (req, res) => {
    const {
        title,
        company,
        type,
        logo,
        url,
        position,
        location,
        description,
        category
    } = req.body

    if (req.user.role != 'poster') return res.status(401).json({ok: false, msg: 'user must be poster'})

    try {
        let _cat = Category.findOne({_id: category})

        if (!_cat) return res.status(500).json({ok: false, msg: 'category not found'})

        let job = new Job({
            title,
            company,
            type,
            logo,
            url,
            position,
            location,
            description,
            category,
            owner: req.user._id
        })

        await job.save()

        return res.status(201).json({ok: true, data: job})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        update a job
// @route       PUT /api/job
// @access      private POSTER ADMIN
exports.updateJob = async (req, res) => {
    if (req.user.role != 'poster' || req.user.role != 'admin') return res.status(401).json({ok: false, msg: 'user must be poster or admin'})
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        delete a job
// @route       DELETE /api/job/:id
// @access      private POSTER ADMIN
exports.deleteJob = async (req, res) => {
    if (req.user.role != 'poster' || req.user.role != 'admin') return res.status(401).json({ok: false, msg: 'user must be poster or admin'})
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}