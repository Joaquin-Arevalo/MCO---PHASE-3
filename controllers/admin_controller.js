//responsible for displaying the admin page, getting all reported posts and comments -arevalo

const {post, comment} = require('../models/post_model.js');
const database = require('../models/database.js');
const account = require('../models/account_model.js');

const admin_controller = {
    get_admin: function(req, res){
        res.render('admin_page', { user: req.session.Username, acc_type: req.session.Account_type });

    },

    get_all_reported_documents: async function(req, res){
        try{
            // const reported_posts = await database.findMany({post: {Report_Count: {gte: 1}}});
            const rreported_posts = await database.findMany(post, {Report_Count: {$gte: 1}});
            const reported_posts = rreported_posts.reverse();
            const rreported_comments = await database.findMany(comment, {Comment_report_count: {$gte: 1}});
            const reported_comments = rreported_comments.reverse();
            
            const rreported2_posts = await database.findMany(post, {Report_Count: 0, Comment_Report_Count: {$gte: 1}});
            const reported2_posts = rreported2_posts.reverse();
            // const rreported2_comments = await database.findMany(comment, {Comment_report_count: {$gte: 1}});
            // const reported2_comments = rreported2_comments.reverse();

            const accounts = await database.findMany(account, {});
            // const reported_posts = await post.findMany({Report_Count: {$gte: 1}});

            res.render('admin_page', {user: req.session.Username, acc_type: req.session.Account_type, reported_posts, reported_comments, reported2_posts, accounts});
        }catch(error){
            console.error("Error processing reported post: ", error);
            res.status(500).send('Internal Server Error!');
        }
    }
}

module.exports = admin_controller;