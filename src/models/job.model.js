const { Schema, model } = require('mongoose')

const jobSchema = Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'title required']
    },
    company: {
        type: String,
        trim: true,
        required: [true, 'company required']
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'type required'],
        enum: ['full-time', 'part-time', 'freelance']
    },
    logo: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true,
        required: [true, 'position required']
    },
    location: {
        type: String,
        trim: true,
        required: [true, 'location required']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'description required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'category required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'owner required']
    },
    views: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

jobSchema.pre('remove', async function(next) {
    await mongoose.model('Solicitud').deleteMany({job: this._id})
    next()
})

module.exports = model('Job', jobSchema)