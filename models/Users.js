const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'staff',
        },
        dateOfRegistration: {
            type: Date,
            default: Date.now
        },
        token: {
            type: String,
            default: null
        } 
});

module.exports = mongoose.model('User', userSchema);