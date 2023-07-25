const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Image', Image);