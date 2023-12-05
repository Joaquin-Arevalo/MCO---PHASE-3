//responsible for displaying the view post page, getting all the post as well as comments, deletion and reporting of post -arevalo
//categories - denise
const {post, report, comment, W_L, report_comment} = require('../models/post_model.js');
const database = require('../models/database.js');
const account = require('../models/account_model.js');

const view_post_controller = {
    get_view_post: function(req, res){
        res.render('view_post', { user: req.session.Username, acc_type: req.session.Account_type });
    },

    get_all_post_documents: async function(req, res){
        try {
            const rposts = await database.findMany(post, {});
            const accounts = await database.findMany(account, {});

            var posts = req.query.category
              ? rposts.reverse().filter(e => e.Category === req.query.category)
              : rposts.reverse();
      
            const rcomments = await database.findMany(comment, {});
            const comments = rcomments.reverse();
      
            res.render("view_post", {
              user: req.session.Username,
              posts,
              accounts,
              comments,
              acc_type: req.session.Account_type,
            });
          } catch (error) {
            console.error("Error processing post: ", error);
            res.status(500).send("Internal Server Error!");
          }
    },
 
    delete_post_document: async function(req, res){
        try{
            const post_id = req.body.post_id;
            const comment_res = await database.findMany(comment, {post: post_id});
            await database.deleteMany(report, {post: post_id});
            await database.deleteMany(W_L, {post: post_id});
            for(i = 0; i < comment_res.length; i++){
                await database.deleteOne(report_comment, {comment: comment_res[i]._id});
            }
           
            await database.deleteMany(comment, {post: post_id});
            await database.deleteOne(post, {_id: post_id});
            res.redirect('/view_post');
        }catch(error){
            console.error("Error deleting post: ", error);
            res.status(500).send("Internal Server Error!"); 
        }
    },

    report_post_document: async function(req, res){//create condition that a user can only report a post once
        try{
            const post_id = req.body.post_id;

            const existing_report = await report.findOne({post: post_id, user_reported: req.session.Username});

            if(existing_report){
                console.log("You already reported this post!");
                // res.redirect('/view_post');
                return;
            }

            const new_report = new report({
                post: post_id,
                user_reported: req.session.Username
            });
            await new_report.save();

            await database.updateOne(post, {_id: post_id}, {$inc: {Report_Count: 1}});
            res.redirect('/view_post');
        }catch(error){
            console.error("Error reporting post: ", error);
            res.status(500).send("Internal Server Error!");
        }
    },
}

module.exports = view_post_controller;