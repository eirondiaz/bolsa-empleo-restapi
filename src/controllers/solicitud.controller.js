const Solicitud = require('../models/solicitud.model')

// @desc        get all solicitudes by user
// @route       GET /api/v1/solicitud
// @access      private USER
exports.getAllSolicitudByUser = async (req, res) => {
    if (req.user.role != 'user') 
        return res.status(403).json({ok: false, msg: 'role must be user'})

    const { sort } = req.query
    
    try {
        let _solicitudes

        if (sort === 'asc' || sort === 'desc') {
            _solicitudes = await Solicitud.find({user: req.user._id})
                .sort({createdAt: sort})
                .populate('user')
                .populate('job')
        }
        else {
            _solicitudes = await Solicitud.find({user: req.user._id})
                .populate('user')
                .populate('job')
        }

        return res.status(200).json({ok: true, data: _solicitudes})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get solicitud by id
// @route       GET /api/v1/solicitud/:id
// @access      private USER
exports.getSolicitudById = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get all solicitudes by job id
// @route       GET /api/v1/job/:idjob/solicitud
// @access      private POSTER
exports.getAllSolicitudesByJobId = async (req, res) => {
    try {
        if (req.user.role !== 'poster') 
            return res.status(403).json({ok: false, msg: 'role must be poster'})

        const _solicitudes = await Solicitud.find({job: req.params.idjob})

        return res.status(200).json({ok: true, data: _solicitudes})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        create solicitud
// @route       POST /api/v1/solicitud
// @access      private USER
exports.createSolicitud = async (req, res) => {
    try {
        if (req.user.role != 'user') 
            return res.status(403).json({ok: false, msg: 'role must be user'})

        const newSolicitud = new Solicitud(req.body)

        await newSolicitud.save()

        return res.status(201).json({ok: true, data: newSolicitud})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}