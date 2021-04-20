const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name required']
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'lastname required']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password required'],
        select: false
    },
    foto: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    },
    role: {
        type: String,
        enum: ['user', 'poster', 'admin'],
        default: 'user'
    }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)