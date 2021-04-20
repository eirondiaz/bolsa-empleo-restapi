const Category = require('../models/category.model')

// @desc        get all categories
// @route       GET /api/category
// @access      public
exports.getAllCategories = async (req, res) => {
    try {
        const _ctgy = await Category.find()

        return res.status(200).json({ok: true, data: _ctgy})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        get category by id
// @route       GET /api/category/:id
// @access      public
exports.getCategoryById = async (req, res) => {
    try {
        const _ctgy = await Category.findOne({_id: req.params.id})

        return res.status(200).json({ok: true, data: _ctgy})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        create category
// @route       POST /api/category
// @access      private POSTER ADMIN
exports.createCategory = async (req, res) => {

    const { title } = req.body

    if (req.user.role != 'poster' && req.user.role != 'admin') 
        return res.status(401).json({ok: false, msg: 'user must be poster or admin'})

    try {
        const _ctgy = new Category({
            title
        })

        await _ctgy.save()
        return res.status(201).json({ok: true, data: _ctgy})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        update category
// @route       PUT /api/category
// @access      private POSTER ADMIN
exports.updateCategory = async (req, res) => {

    const { _id, title } = req.body

    if (req.user.role != 'poster' && req.user.role != 'admin') 
        return res.status(401).json({ok: false, msg: 'user must be poster or admin'})

    try {
        let _ctgyFind = await Category.findOne({_id})

        if (!_ctgyFind) return res.status(404).json({ok: false, msg: 'category not found'})

        let _ctgy = await Category.findByIdAndUpdate(_id, { title }, { new: true })

        return res.status(200).json({ok: true, data: _ctgy})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        delete category
// @route       DELETE /api/category/:id
// @access      private POSTER ADMIN
exports.deleteCategory = async (req, res) => {

    if (req.user.role != 'poster' && req.user.role != 'admin') 
        return res.status(401).json({ok: false, msg: 'user must be poster or admin'})

    try {
        let _ctgyFind = await Category.findOne({_id: req.params.id})

        if (!_ctgyFind) return res.status(404).json({ok: false, msg: 'category not found'})

        const ctgyDeleted = await Category.findByIdAndDelete(req.params.id)

        if (!ctgyDeleted) return res.status(400).json({ok: false, msg: 'error'})

        return res.status(200).json({ok: true, data: ctgyDeleted})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}