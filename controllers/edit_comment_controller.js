//responsible for displaying the edit comment page, and updating the comment of a specific post -arevalo

const {post, comment} = require('../models/post_model.js');
const database = require('../models/database.js');
const account = require('../models/account_model.js');

const edit_comment_controller = {
    get_edit_comment: async function(req, res){
        try{
            const true_post_id = req.body.true_post_id;
            const comment_id = req.body.post_id;
            console.log("true_post_id: ", true_post_id);
            console.log("comment_id: ", comment_id);
            const dpost = await database.findOne(post, {_id: true_post_id});
            const dcomm = await database.findOne(comment, {_id: comment_id});
            const daccount = await database.findOne(account, {Username: dpost.Username});
            res.render('edit_comment', {user: req.session.Username, dpost, acc_type: req.session.Account_type, daccount, dcomm});
        }catch(error){
            console.error("Error processing designated post: ", error);
            res.status(500).send('Internal Server Error!');
        }
    }, 

    update_comment: async function(req, res){
        const {post_id, comment_text} = req.body;
        console.log("post_id: ", post_id);

        if(!comment_text){
            return res.status(400).json({message: "Missing Comment Text!"});
        }else{
            try{
                // const post_id = req.body.post_id;

                console.log("post_id: ", post_id);

                await database.updateOne(comment, {_id: post_id}, {
                    $set: {
                      Comment_text: comment_text  
                    }
                });

                res.json({success: true, message: "Comment Saved"});
                
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Comment Controller Error!"});
            }
        }
    },
}

module.exports = edit_comment_controller;