const Job = require('../models/job.model')
const Category = require('../models/category.model')

// @desc        get all jobs
// @route       GET /api/job
// @access      public
exports.getAllJobs = async (req, res) => {
    const options = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        pagination: req.query.pagination || true,
        populate: ['category', 'owner']
    }

    let URL = `http://localhost:${process.env.PORT}`
    if (process.env.NODE_ENV !== 'development')
        URL = 'https://bolsa-empleo-dr.herokuapp.com'

    try {
        let _jobs = await Job.paginate({}, options)

        if (_jobs.hasNextPage)
            _jobs.nextPage = `${URL}/api/v1/job?page=${options.page + 1}&limit=${options.limit}`

        if (_jobs.hasPrevPage)
            _jobs.prevPage = `${URL}/api/v1/job?page=${options.page - 1}&limit=${options.limit}`

        return res.status(200).json({ok: true, data: _jobs})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get a job by id
// @route       GET /api/job/:id
// @access      public
exports.getJobById = async (req, res) => {
    try {
        let _job = await Job.findOne({_id: req.params.id})
            .populate('category')
            .populate('owner')

        return res.status(200).json({ok: true, data: _job})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get all jobs by owner
// @route       GET /api/job/owner
// @access      private POSTER
exports.getAllJobsByOwner = async (req, res) => {
    try {
        if (req.user.role !== 'poster') 
            return res.status(403).json({ok: false, msg: 'role must be poster'})

        const _jobs = await Job.find({owner: req.user._id})
            .populate('category')
            .populate('owner')

        return res.status(200).json({ok: true, data: _jobs})

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

    if (req.user.role != 'poster') 
        return res.status(403).json({ok: false, msg: 'user must be poster'})

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
    if (req.user.role != 'poster' && req.user.role != 'admin') 
        return res.status(403).json({ok: false, msg: 'user must be poster or admin'})

    let {owner, views, createdAt, ...data} = req.body
    
    try {
        const _job = await Job.findByIdAndUpdate(req.body._id, data, { new: true })

        return res.status(200).json({ok: true, data: _job})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        delete a job
// @route       DELETE /api/job/:id
// @access      private POSTER ADMIN
exports.deleteJob = async (req, res) => {
    if (req.user.role != 'poster' && req.user.role != 'admin') 
        return res.status(403).json({ok: false, msg: 'user must be poster or admin'})

    try {
        const jobDeleted = await Job.findById(req.params.id)

        if (!jobDeleted) return res.status(404).json({ok: false, msg: 'job not found'})

        await jobDeleted.remove()
        return res.status(200).json({ok: true, data: jobDeleted})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        update view job
// @route       PUT /api/job/:id/view
// @access      public
exports.updateViewJob = async (req, res) => {
    try {
        const __job = await Job.findOne({_id: req.params.id})

        if (!__job) return res.status(404).json({ok: false, msg: 'job not found'})

        const views = __job.views + 1

        const _job = await Job.findByIdAndUpdate(req.params.id, {views}, { new: true })

        return res.status(200).json({ok: true, data: _job})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get jobs by category
// @route       GET /api/v1/job/category/:ctgrtittle
// @access      public
exports.getJobsByCategory = async (req, res) => {
    try {
        let title = req.params.ctgrtittle
        title = title.trim().toLowerCase() 
        
        const _ctgry = await Category.findOne({title})

        //if (!_ctgry) return res.status(404).json({ok: false, msg: ''})

        const _jobs = await Job.find({category: _ctgry._id || '507f1f77bcf86cd799439011'})

        return res.status(200).json({ok: true, data: _jobs})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}