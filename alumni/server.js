var express = require('express');
var app = express();
app.use(express.static(__dirname + "/public"));
const dotenv = require('dotenv');


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// signin page
app.get('/signin', function(req, res) {
  res.render('pages/signin');
});

// signup page
app.get('/signup', function(req, res) {
  res.render('pages/signup');
});

// forget password page
app.get('/forget', function(req, res) {
  res.render('pages/forget');
});

// home page
app.get('/home', function(req, res) {
  res.render('pages/home');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

// latest page
app.get('/latest', function(req, res) {
  res.render('pages/latest');
});

// jobs page
app.get('/jobs', function(req, res) {
  res.render('pages/jobs');
});

// internship page
app.get('/intern', function(req, res) {
  res.render('pages/intern');
});

// events page
app.get('/events', function(req, res) {
  res.render('pages/events');
});

// gallery page
app.get('/gallery', function(req, res) {
  res.render('pages/gallery');
});

app.listen(4000);
console.log('Server is listening on port 4000');