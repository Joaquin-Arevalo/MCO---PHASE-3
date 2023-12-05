//responsible for making requests to the website -arevalo
//authentication, open access -cuady

const controllers = require('../controllers/controller');
const create_post_controllers = require('../controllers/create_post_controller');
const login_controllers = require('../controllers/login_controller');
// const logout_controller = require('../controllers/logout_controller');
const profile_controllers = require('../controllers/profile_controller');
const register_controllers = require('../controllers/register_controller');
const view_post_controllers = require('../controllers/view_post_controller');
const logout_controllers = require('../controllers/logout_controller');
const admin_controllers = require('../controllers/admin_controller');
const comment_controllers = require('../controllers/comment_controller');
const edit_post_controllers = require('../controllers/edit_post_controller');
const edit_comment_controllers = require('../controllers/edit_comment_controller');
const edit_profile_controllers = require('../controllers/edit_profile_controller');
const vote = require("../controllers/voting.controller");
const query = require("../controllers/query_post.controller");

const express = require('express');
const app = express();
app.use(express.json()); 

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.Username) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Open Access Middleware from index.js

function openAccess(req, res, next) {
    if (req.session.Username) {
        res.redirect('/');
    } else {
        next();
    }
}


// Routes that require open access (both authenticated and unauthenticated users)
app.get('/login', login_controllers.get_login);
app.post('/login_account', openAccess, login_controllers.post_login);
app.get('/register', register_controllers.get_register);
app.post('/register_account', openAccess, register_controllers.post_register);

// Routes that require authentication
app.get('/', controllers.get_index);
app.get('/create_post', isAuthenticated, create_post_controllers.get_create_post);
app.get('/profile', isAuthenticated, profile_controllers.get_profile);
app.get('/view_post', view_post_controllers.get_view_post);
app.get('/logout', isAuthenticated, logout_controllers.get_logout);
app.get('/admin_page', isAuthenticated, admin_controllers.get_admin);
app.post('/comment_page', isAuthenticated, comment_controllers.get_comment);
app.post('/edit_post', isAuthenticated, edit_post_controllers.get_edit_post);
app.post('/edit_comment', isAuthenticated, edit_comment_controllers.get_edit_comment);
app.post('/edit_profile', isAuthenticated, edit_profile_controllers.get_edit_profile);

// More routes with isAuthenticated middleware
app.get('/retrieve_all_posts', view_post_controllers.get_all_post_documents);
app.get('/retrieve_all_reported_posts', isAuthenticated, admin_controllers.get_all_reported_documents);
app.get('/retrieve_profile', isAuthenticated, profile_controllers.get_all_user_documents);

app.post('/save_post', isAuthenticated, create_post_controllers.post_post_details);
app.post('/save_comment', isAuthenticated, comment_controllers.post_comment_details);

app.post('/delete_profile', isAuthenticated, profile_controllers.delete_profile_document);
app.post('/delete_post', isAuthenticated, view_post_controllers.delete_post_document);
app.post('/update_post', isAuthenticated, edit_post_controllers.update_post);
app.post('/report_post', isAuthenticated, view_post_controllers.report_post_document);
app.post('/delete_comment', isAuthenticated, comment_controllers.delete_comment_document);
app.post('/update_comment', isAuthenticated, edit_comment_controllers.update_comment);
app.post('/report_comment', isAuthenticated, comment_controllers.report_comment_document);
app.post('/update_profile', isAuthenticated, edit_profile_controllers.update_profile);

// Additional functionality routes with isAuthenticated
app.get("/search", query.searchPost);
app.post("/like", isAuthenticated, vote.likePost);
app.post("/dislike", isAuthenticated, vote.dislikePost);

module.exports = app;