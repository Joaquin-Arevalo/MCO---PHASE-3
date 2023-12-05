//displays the post with either similar title or body --denise
//const post_model = require("../models/post_model");

const {post} = require('../models/post_model.js');
const database = require('../models/database.js');

const query = {
  searchPost: async (req, res) => {
    const input = req.query.value;

    const result = await database.findMany(post, {
      Title: { $regex: new RegExp(input, "i") },
    });
    console.log(result);

    return res.json(result);
  },
};

module.exports = query;
