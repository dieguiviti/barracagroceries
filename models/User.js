const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

// Create Schema
let User = new SCHEMA({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    datefRegistration: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = MONGOOSE.model('user', User);