//responsible for displaying the edit profile page, and updating the values of the user -arevalo

const database = require('../models/database.js');
const account = require('../models/account_model.js');

const edit_profile_controller = {
    get_edit_profile: async function(req, res){
        const acc_id = req.body.acc_id;
        console.log("acc_id: ", acc_id);
        const accounts = await database.findOne(account, {_id: acc_id});
        console.log("accounts: ", accounts);
        res.render('edit_profile',  { user: req.session.Username, acc_type: req.session.Account_type, accounts });
    },

    update_profile: async function(req, res){
        const {body, image, acc_ID} = req.body;

        if(!body){
            return res.status(400).json({message: "Missing Bio!"});
        }else{
            if(!image){
                try{
                    await database.updateOne(account, {_id: acc_ID}, {
                        $set: {
                            description: body
                        }
                    });
                    res.json({success: true, message: "Profile Updated"});
                }catch(error){
                    console.error(error);
                    res.status(500).json({success: false, message: "Edit Profile Controller Error!"});
                }
            }else{
                try{
                    await database.updateOne(account, {_id: acc_ID}, {
                        $set: {
                            description: body,
                            pfp: image
                        }
                    });
                    res.json({success: true, message: "Profile Updated"});
                }catch(error){
                    console.error(error);
                    res.status(500).json({success: false, message: "Edit Profile Controller Error!"});
                }
            }
        }
    }
}

module.exports = edit_profile_controller;