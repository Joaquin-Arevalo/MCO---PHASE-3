//responsible for displaying the edit post page, and updating the values of the post -arevalo

const {post} = require('../models/post_model.js');
const database = require('../models/database.js');

const edit_post_controller = {
    get_edit_post: async function(req, res){
        const post_id = req.body.post_id;
        console.log("post_id: ", post_id);
        const dpost = await database.findOne(post, {_id: post_id});
        console.log("dpost: ", dpost);
        res.render('edit_post', { user: req.session.Username, acc_type: req.session.Account_type, dpost });
    }, 

    update_post: async function(req, res){
        const {title, category, body, image, post_ID} = req.body;
        // console.log("req.body: ", title, category, body, image);
        // // const post_id = req.body.post_id;
        // console.log("post_id: ", post_ID);

        if(!title || !body){
            return res.status(400).json({message: "Missing Title and/or Body!"});
        }else{
            try{
                await database.updateOne(post, {_id: post_ID}, {
                    $set: {
                      Title: title,
                      Category: category,
                      Body: body,
                      Image: image  
                    }
                });
                    
                res.json({success: true, message: "Post Updated"});
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Edit Post Controller Error!"});
            }
        }
    }
}

module.exports = edit_post_controller;