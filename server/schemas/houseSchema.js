const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        required: true,
        default: false
    },
    propertyPolicy: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    totalSize: {
        type: Number,
        required: true
    },
    petPolicy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    images: {
        type: [String],
        required: true
    }
})


module.exports = mongoose.model('houses', schema)