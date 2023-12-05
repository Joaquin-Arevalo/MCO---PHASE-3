//responsible for displaying the create post page, and saving a post to the database -arevalo

const {post} = require('../models/post_model.js');

const create_post_controller = {
    get_create_post: function(req, res){
        res.render('create_post', { user: req.session.Username, acc_type: req.session.Account_type });
    },

    post_post_details: async function(req, res){
        const {title, category, body, image, date} = req.body;

        if(!title || !body){
            return res.status(400).json({message: "Missing Title and/or Body!"});
        }else{
            try{
                const new_post = new post({
                    Username: req.session.Username,
                    Title: title,//add category here
                    Category: category,
                    Body: body,
                    Image: image,
                    Date: date,
                    Report_Count: 0,
                    Comment_Report_Count: 0,
                    Ws_Count: 0,
                    Ls_Count: 0,
                });
                await new_post.save();
                    
                res.json({success: true, message: "Post Saved"});
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Create Post Controller Error!"});
            }
        }
    }
}

module.exports = create_post_controller;