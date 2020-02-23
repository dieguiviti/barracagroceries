const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;


// Build schema
let Item = new SCHEMA({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Item = MONGOOSE.model('item', Item);

