//displays the index which is the home page -arevalo

const controller = {
    getFavicon: function(req, res){
        res.status(204);
    },
    get_index: function(req, res){
        res.render('index', { user: req.session.Username });
    }
}

module.exports = controller;