const { Schema, model } = require('mongoose')

const solicitudSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user required']
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'job required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

module.exports = model('Solicitud', solicitudSchema)