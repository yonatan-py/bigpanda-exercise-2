var express = require('express');
var bodyParser = require('body-parser')
var mongojs = require('mongojs');

var database = mongojs('big-panda');
var comments = database.collection('comments');

var app = express();
app.use(bodyParser());
app.use(express.static('public'));
app.use(express.static('bower_components'));

app.post('/comment', function (req, res) {
  res.status(200);
  var comment = req.body;
  comments.insert(comment);
});

app.get('/comments', function (req, res) {
  comments.find(function (error, comments) {
    res.json(comments).end();
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
