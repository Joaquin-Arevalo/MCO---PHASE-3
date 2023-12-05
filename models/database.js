//database functions and connection to the database is done here -arevalo

const mongoose = require('mongoose');

const Account = require('./account_model.js');
// const Post = require('./post_model.js');

const url = 'mongodb+srv://admin:ccapdev-readit-project0027@cluster0.ut1s2tm.mongodb.net/';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const database = {
    connect: async function () {
        await mongoose.connect(url, options);
        console.log('Connected to: ' + url);
    },

    insertOne: async function(model, doc) {
        return await model.create(doc);
    },

    insertMany: async function(model, docs) {
        return await model.insertMany(docs);
    },

    findOne: async function(model, query, projection) {
        return await model.findOne(query, projection);
    },

    findMany: async function(model, query, projection) {
        return await model.find(query, projection);
    },

    updateOne: async function(model, filter, update) {
        return await model.updateOne(filter, update);
    },

    updateMany: async function(model, filter, update) {
        return await model.updateMany(filter, update);
    },

    deleteOne: async function(model, conditions) {
        return await model.deleteOne(conditions);
    },

    deleteMany: async function(model, conditions) {
        return await model.deleteMany(conditions);
    }
}

module.exports = database;