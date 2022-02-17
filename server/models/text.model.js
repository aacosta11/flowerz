const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    header: {
        type: String,
    },
    body: {
        type: String,
    },
    footer: {
        type: String,
    },
    cost: {
        type: Number
    }
})
const Text = mongoose.model('Text', Schema);
module.exports = Text;