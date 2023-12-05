//delete the session -arevalo

// const post = require('../models/post_model.js');
// const database = require('../models/database.js');

const logout_controller = {
    get_logout: function(req, res){
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/');
        });
    }
}

module.exports = logout_controller;