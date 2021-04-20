const { Schema, model } = require('mongoose')

const categorySchema = Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'title required']
    }
}, { versionKey: false })

module.exports = model('Category', categorySchema)