var express = require('express');
var app = express();
var cors = require('cors');

// enable cors
app.use(cors());
var posts = [
    {message: 'hello'},
    {message: 'hi'}
];

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.listen(3000);