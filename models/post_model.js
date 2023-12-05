//post, comment, report post, report comment, W & L schemas -arevalo

var mongoose = require('mongoose');

var report_schema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user_reported: {
        type: String,
        required: true
    },
});

var report = mongoose.model('report', report_schema);

var W_L_schema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user_W_L: {
        type: String,
        required: true
    },
    chosen_W_L: {
        type: String,
        required: true
    }
});

var W_L = mongoose.model('W_L', W_L_schema);

var report_comment_schema = new mongoose.Schema({
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user_reported: {
        type: String,
        required: true
    },
});

var report_comment = mongoose.model('report_comment', report_comment_schema);

var comment_schema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    Comment_user: {
        type: String,
        required: true
    },
    Comment_text: {
        type: String,
        required: true
    },
    Comment_date: {
        type: String,
        required: true
    },
    Comment_report_count: {
        type: Number,
        required: true
    }
});

var comment = mongoose.model('comment', comment_schema);

var post_schema = new mongoose.Schema({//should i add an id part?
    Username: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Body: {
        type: String,
        required: true
    },
    Image: { // change to photo directory (npm package multer)
        type: String
    },
    Date: {
        type: String,
        required: true
    },
    Report_Count: {
        type: Number,
        required: true
    },
    Comment_Report_Count: {
        type: Number,
        required: true
    },
    Ws_Count: {
        type: Number,
        required: true
    },
    Ls_Count: {
        type: Number,
        required: true
    },
});

// report_schema.post('save', async function (doc){
//     await post.findByIdAndUpdate(doc.post, {$inc: {Report_Count: 1}});
// });

// report_comment_schema.post('save', async function (doc){//not sure if this is correct
//     await report_comment.findByIdAndUpdate(doc.comment, {$inc: {Comment_report_count: 1}});
// });

var post = mongoose.model('post', post_schema);

//module.exports = mongoose.model('post', post_schema);

module.exports = {post, report, comment, report_comment, W_L};
// module.exports = {post, report};