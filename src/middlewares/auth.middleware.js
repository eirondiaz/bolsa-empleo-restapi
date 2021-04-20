const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.authMdlw = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = await req.headers.authorization.split(' ')[1] || req.headers.authorization
            //token verify
            const decode = await jwt.verify(token, process.env.JWT_SECRET || 'secretKey')

            const _user = await User.findOne({_id: decode._id})

            if (!_user) return res.status(404).json({ok: false, msg: 'user not found'}) 

            req.user = _user
            next()
        }
        else {
            return res.status(401).json({ok: false, msg: 'unauthorized'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}