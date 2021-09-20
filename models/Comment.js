const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('imageComment', commentSchema);