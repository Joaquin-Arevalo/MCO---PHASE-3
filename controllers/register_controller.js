//responsible for displaying the register page, and registering a new account -arevalo
const account = require('../models/account_model.js');
const bcrypt = require('bcrypt');
const salt_rounds = 10;

const register_controller = {
    get_register: function(req, res){
        res.render('register', { user: req.session.Username, acc_type: req.session.Account_type });
    }, 

    // check_username: async function(req, res){
    //     var username = req.query.username;
    //     var result = await database.findOne(account, {Username: username}, 'username');
    //     res.send(result);
    // },

    post_register: async function(req, res){
        //testing here
        // const {username, password, confirm_password, account_type} = req.body;
        const {username, password, confirm_password} = req.body;

        const user_exists = await account.findOne({Username: username});
        if(user_exists){
            return res.status(400).json({message: "Username Already Exists!"});
        }else if(username === "[deleted]"){
            return res.status(400).json({message: "Invalid Username!"});
        }else if(password !== confirm_password){
            return res.status(400).json({message: "Passwords Do Not Match!"});
        }else{
            try{
                const h_password = await bcrypt.hash(password, salt_rounds);
                const new_account = new account({
                    Username: username,
                    Password: h_password,
                    // Account_type: account_type,
                });
                await new_account.save();
    
                res.json({success: true, message: "Registration Successful!"});
            }catch(error){
                console.error(error);
                res.status(500).json({success: false, message: "Registration Controller Error!"});
            }
        }
    }
}

module.exports = register_controller;

// bcrypt.hash(password, salt_rounds, async function(err, hash){
//     const new_account = {
//         Username: username,
//         Password: hash,
//         Account_type: account_type
//     }
// });