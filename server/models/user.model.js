const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 2 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 4 characters long'],
    }
});
const User = mongoose.model('User', Schema);
module.exports = User;