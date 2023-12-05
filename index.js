//environments/packages to be used in the website -arevalo

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const session = require('express-session');
const database = require('./models/database.js');
const MongoStore = require('connect-mongo');



const app = express();

dotenv.config();
port = process.env.PORT;
// hostname = process.env.HOSTNAME;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('eq', function (a, b){
    return a === b;
});
hbs.registerHelper('neq', function (a, b){
    return a !== b;
});
hbs.registerHelper('consolelog', function (message) {
    console.log(message);
});
hbs.registerHelper('toString', function (value) {
    return String(value);
});
hbs.registerHelper('limit', function (arr, limit){
    return arr.slice(0, limit);
});
hbs.registerHelper('gt', function (a, b){
    return a > b;
});
hbs.registerHelper('length', function (arr){
    return arr.length;
});



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

database.connect();

app.use(session({
    secret: 'session-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:ccapdev-readit-project0027@cluster0.ut1s2tm.mongodb.net/'
    }),
    cookie: { 
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use('/', routes);

app.use(function(req, res){
    res.send('Error 404: Page Not Found');
});

app.listen(port, function(req,res){
// app.listen(port, hostname, function(req,res){
    // console.log('Server running at: ');
    // console.log('http://' + hostname + ':' + port);
    console.log('listening on port:' + port);
});