const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    header: {
        type: String,
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    footer: {
        type: String,
    },
    cost: {
        type: Number,
        required: [true, 'Cost is required'],
    }
})
const Text = mongoose.model('Text', Schema);
module.exports = Text;