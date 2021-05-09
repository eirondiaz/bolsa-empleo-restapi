const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @desc        register an user
// @route       POST /api/auth/register
// @access      public
exports.register = async (req, res) => {
    const { name, lastname, email, password, role } = req.body
    try {
        if (role.toLowerCase() === 'admin')
            return res.status(400).json({ok: false, msg: 'role admin cant be created'})

        let _user = await User.findOne({email})

        if (_user) return res.status(400).json({ok: false, msg: 'email repeated'})

        let hashed_pass = await bcrypt.hash(password, 10)

        _user = new User({
            name,
            lastname, 
            email,
            password: hashed_pass,
            role: role || 'user'
        })

        await _user.save()

        const token = await jwt.sign({_id: _user._id, role: _user.role}, process.env.JWT_SECRET || 'secretKey')
        return res.status(201).json({ok: true, data: _user, token})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// @desc        login
// @route       POST /api/auth/login
// @access      public
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        let _user = await User.findOne({ email }).select('+password')
        if (!_user) return res.status(404).json({ok: false, msg: 'email invalid'})
        
        const isMatch = await bcrypt.compare(password, _user.password)

        if (!isMatch) return res.status(400).json({ok: false, msg: 'password incorrect'})

        const token = await jwt.sign({_id: _user._id, role: _user.role}, process.env.JWT_SECRET || 'secretKey')
        return res.status(200).json({ok: true, token, role: _user.role})

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}