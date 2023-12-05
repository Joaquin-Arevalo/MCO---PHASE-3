//responsible for displaying the comment page, and saving a comment to the database, as well as deleting and reporting a comment -arevalo

const {post, comment, report_comment} = require('../models/post_model.js');
const database = require('../models/database.js');
const account = require('../models/account_model.js');

const comment_controller = {
    get_comment: async function(req, res){
        try{
            const post_id = req.body.post_id;

            const dpost = await database.findOne(post, {_id: post_id});
            const daccount = await database.findOne(account, {Username: dpost.Username});
            res.render('comment_page', {user: req.session.Username, dpost, acc_type: req.session.Account_type, daccount});
        }catch(error){
            console.error("Error processing designated post: ", error);
            res.status(500).send('Internal Server Error!');
        }
    },

    post_comment_details: async function(req, res){
        const {post_id, comment_text, comment_date} = req.body;
        
        if(!comment_text){
            return res.status(400).json({message: "Missing Comment Text!"});
        }else{
            try{
                // const post_id = req.body.post_id;

                // console.log("post_id: ", post_id);

                const new_comment = new comment({
                    post: post_id,
                    Comment_user: req.session.Username,
                    Comment_text: comment_text,
                    Comment_date: comment_date,
                    Comment_report_count: 0,
                });
                await new_comment.save();

                res.json({success: true, message: "Comment Saved"});
                
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Comment Controller Error!"});
            }
        }
    },

    delete_comment_document: async function(req, res){
        try{
            const post_id = req.body.post_id;
            //const 
            const comment_id = await database.findOne(comment, {_id: post_id});
            await database.updateOne(post, {_id: comment_id.post}, {$inc: {Comment_Report_Count: -1}});
            await database.deleteOne(comment, {_id: post_id});
            await database.deleteMany(report_comment, {comment: post_id});
            res.redirect('/view_post');
        }catch(error){
            console.error("Error deleting comment: ", error);
            res.status(500).send("Internal Server Error!"); 
        }
    },

    report_comment_document: async function(req, res){//create condition that a user can only report a post once
        try{
            const post_id = req.body.post_id;

            const existing_report = await report_comment.findOne({comment: post_id, user_reported: req.session.Username});

            if(existing_report){
                console.log("You already reported this comment!");
                // res.redirect('/view_post');
                return;
            }

            const new_report = new report_comment({
                comment: post_id,
                user_reported: req.session.Username
            });
            await new_report.save();
            const comment_id = await database.findOne(comment, {_id: post_id});
            await database.updateOne(comment, {_id: post_id}, {$inc: {Comment_report_count: 1}});
            if(comment_id.Comment_report_count === 0){
                await database.updateOne(post, {_id: comment_id.post}, {$inc: {Comment_Report_Count: 1}});
            }
            //await database.updateOne(post, {_id: comment_id.post}, {$inc: {Comment_Report_Count: 1}});
            res.redirect('/view_post');
        }catch(error){
            console.error("Error reporting comment: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },
}

module.exports = comment_controller;