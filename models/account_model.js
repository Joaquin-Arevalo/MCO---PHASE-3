//account schema -arevalo

var mongoose = require('mongoose');

var account_schema = new mongoose.Schema({
    Username: {//might change to username only
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },  
    Account_type: {
        type: String,
        default: 'User'
    },
    pfp: {
        type: String,
        default: 'https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0'
    },
    description: {
        type: String,
        default: 'No bio.'
    }
});

module.exports = mongoose.model('account', account_schema);