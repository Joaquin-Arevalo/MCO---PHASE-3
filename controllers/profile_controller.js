//responsible for displaying the profile page, and getting all post and comments done by the user -arevalo

const {post, comment} = require('../models/post_model.js');
const database = require('../models/database.js');
const account = require('../models/account_model.js');

const profile_controller = {
    get_profile: function(req, res){
        res.render('profile', { user: req.session.Username, acc_type: req.session.Account_type });
    },

    get_all_user_documents: async function(req, res){
        try{
            const account_res = await database.findOne(account, {Username: req.session.Username});
            const rposts = await database.findMany(post, {Username: account_res.Username});
            const posts = rposts.reverse();
            const rcomments = await database.findMany(comment, {Comment_user: account_res.Username});
            const comments = rcomments.reverse();
            res.render('profile', {user: req.session.Username, posts, comments, acc_type: req.session.Account_type, account_res});
        }catch(error){
            console.error("Error fetching profile details: ", error);
            res.status(500).send('Internal Server Error!');
        }
    },

    delete_profile_document: async function(req, res){
        const acc_id = req.body.acc_id;
        try{
            await database.updateOne(post, {Username: req.session.Username}, {
                $set: {
                    Username: "[deleted]",
                }
            });
            await database.updateOne(comment, {Comment_user: req.session.Username}, {
                $set: {
                    Comment_user: "[deleted]",
                }
            });
            await database.deleteOne(account, {_id: acc_id});
            req.session.destroy(function(err){
                if(err) throw err;
                res.redirect('/');
            });
        }catch(error){
            console.error("Error deleting account: ", error);
            res.status(500).send("Internal Server Error!"); 
        }

    }
}

module.exports = profile_controller;