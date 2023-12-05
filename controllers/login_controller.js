//responsible for displaying the login page, with a successful login the req.session is populated -arevalo

//const database = require('../models/database.js');
const account = require('../models/account_model.js');
const bcrypt = require('bcrypt');

const login_controller = {
    get_login: function(req, res){
        res.render('login', { user: req.session.Username, acc_type: req.session.Account_type });
    }, 

    post_login: async function(req, res){
        const {username, password} = req.body;

        try{
            const user_exists = await account.findOne({Username: username});

            const m_password = await bcrypt.compare(password, user_exists.Password);

            if(!user_exists){
                return res.status(404).json({message: "Username Not Found!"});
            }else if(!m_password){
                return res.status(401).json({message: "Incorrect Password!"});
            }else{
                //res.render('view_post', { user: req.session.Username });
                req.session.Username = username;
                req.session.Account_type = user_exists.Account_type;



                
                res.json({success: true, message: "Login Successful!"});
                
            }
        }catch(error){
            console.error("Error in post_login:", error);
            res.status(500).json({success: false, message: "Login Controller Error!"});
        }

    }
}

module.exports = login_controller;