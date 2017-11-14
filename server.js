// require statements for packages that will be used.
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// custom modules require
var User = require('./models/User.js');
// enable cors to have server and client web App in different domains
// working with No cors issues.
app.use(cors());

// apply body parser middleware
app.use(bodyParser.json());

// static posts array
var posts = [
    {message: 'hello'},
    {message: 'hi'}
];

// get a list of posts
// TODO(amr): remove static array
app.get('/posts', (req, res) => {
    res.send(posts);
});

// register a new user API endpoint
app.post('/register', (req, res) => {
    var userData = req.body;    // user passed data which should be his email and password
    var user = new User(userData);
    console.log('user data', userData);
    user.save((err, result) => {
        if(err)
            console.log('saving user error');
        res.sendStatus(200);
    });
});

// log a list of current Users documents in mongo DB
app.get('/getUsers', (req, res) => {
    User.find({}, function (err, docs) {
        console.log('Docs', docs);
    });
    res.sendStatus(200);
});

// connect to Mongo DB
mongoose.connect('mongodb://localhost/angular4nodejwts', {useMongoClient: true}, (error) => {
    // check if there is No errors in connecting to Mongo log a success message
    if(! error) {
        console.log('connected to mongo');
    }
});
// start the app on port 3000
app.listen(3000, () =>{
    console.log(' server is listening on 3000');
});