//responsible for making requests to the website -arevalo

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

const express = require('express');
 



//added after submission
const vote = require("../controllers/voting.controller");
const query = require("../controllers/query_post.controller");
//end
const app = express();
app.use(express.json()); 

app.get('/', controllers.get_index);
app.get('/create_post', create_post_controllers.get_create_post);
app.get('/login', login_controllers.get_login);
app.get('/profile', profile_controllers.get_profile);
app.get('/register', register_controllers.get_register);
app.get('/view_post', view_post_controllers.get_view_post);
app.get('/logout', logout_controllers.get_logout);
app.get('/admin_page', admin_controllers.get_admin);
app.post('/comment_page', comment_controllers.get_comment);
app.post('/edit_post', edit_post_controllers.get_edit_post);
app.post('/edit_comment', edit_comment_controllers.get_edit_comment);
app.post('/edit_profile', edit_profile_controllers.get_edit_profile);

 
//app.get('/check_username', register_controllers.check_username);
app.get('/retrieve_all_posts', view_post_controllers.get_all_post_documents);
app.get('/retrieve_all_reported_posts', admin_controllers.get_all_reported_documents);
app.get('/retrieve_profile', profile_controllers.get_all_user_documents);
// app.get('/retrieve_all_comments', comment_controllers.get_all_comment_documents);

app.post('/register_account', register_controllers.post_register);
app.post('/login_account', login_controllers.post_login);
app.post('/save_post', create_post_controllers.post_post_details);
app.post('/save_comment', comment_controllers.post_comment_details);

app.post('/delete_profile', profile_controllers.delete_profile_document);
app.post('/delete_post', view_post_controllers.delete_post_document);//delete post
app.post('/update_post', edit_post_controllers.update_post);
app.post('/report_post', view_post_controllers.report_post_document);
app.post('/delete_comment', comment_controllers.delete_comment_document);
app.post('/update_comment', edit_comment_controllers.update_comment);
app.post('/report_comment', comment_controllers.report_comment_document);
app.post('/update_profile', edit_profile_controllers.update_profile);

//added after submission
app.get("/search", query.searchPost);
app.post("/like", vote.likePost);
// app.post("/unlike", vote.unlikePost);
app.post("/dislike", vote.dislikePost);
// app.post("/undislike", vote.undislikePost);

//end

module.exports = app;