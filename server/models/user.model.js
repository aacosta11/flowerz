const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 2 characters long'],
        unique: [true, 'Username is already taken'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters long'],
    }
});
const User = mongoose.model('User', Schema);
module.exports = User;