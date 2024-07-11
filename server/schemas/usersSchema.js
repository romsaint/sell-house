const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})


module.exports = mongoose.model('users', schema)