//Ws and Ls get either incremented or decremented per post --denise -arevalo 

const {post, W_L} = require("../models/post_model");
const database = require('../models/database.js');

const vote = { //add error handling
  likePost: async (req, res) => {
    const postId = req.body.post_id;
    const post_res = await post.findById(postId);

    const existing_W_L = await W_L.findOne({post: postId, user_W_L: req.session.Username});
    if(!existing_W_L){
        const new_W_L = new W_L({
            post: postId,
            user_W_L: req.session.Username,
            chosen_W_L: 'W'
        });
        await new_W_L.save();
        post_res.Ws_Count += 1;
        await post_res.save();
        res.redirect('/view_post');
    }else{
        if(existing_W_L.chosen_W_L === 'W'){
            post_res.Ws_Count -= 1;
            await post_res.save();
            await database.deleteOne(W_L, {_id: existing_W_L._id});
            res.redirect('/view_post');
        }else{
            post_res.Ls_Count -= 1;
            await post_res.save();
            post_res.Ws_Count += 1;
            await post_res.save();
            existing_W_L.chosen_W_L = 'W';
            await existing_W_L.save();
            res.redirect('/view_post');
        }
    }
  },

  dislikePost: async (req, res) => {
    const postId = req.body.post_id;
    const post_res = await post.findById(postId);

    const existing_W_L = await W_L.findOne({post: postId, user_W_L: req.session.Username});
    if(!existing_W_L){
        const new_W_L = new W_L({
            post: postId,
            user_W_L: req.session.Username,
            chosen_W_L: 'L'
        });
        await new_W_L.save();
        post_res.Ls_Count += 1;
        await post_res.save();
        res.redirect('/view_post');
    }else{
        if(existing_W_L.chosen_W_L === 'L'){
            post_res.Ls_Count -= 1;
            await post_res.save();
            await database.deleteOne(W_L, {_id: existing_W_L._id});
            res.redirect('/view_post');
        }else{
            post_res.Ws_Count -= 1;
            await post_res.save();
            post_res.Ls_Count += 1;
            await post_res.save();
            existing_W_L.chosen_W_L = 'L';
            await existing_W_L.save();
            res.redirect('/view_post');
        }
        
    }
  },
  
};

module.exports = vote;
