const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    header: {
        type: String
    },
    body: {
        type: String,
        required: [true, 'Body is required']
    },
    footer: {
        type: String
    },
    cost: {
        type: Number
    }
});
const Secret = mongoose.model('Secret', Schema);
module.exports = Secret;