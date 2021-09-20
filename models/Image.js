const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    password: {
        type: String,
    },
    like: {
        type: Number
    },
    disLike: {
        type: Number
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('aboutImage', ImageSchema);