const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('student', path.join(__dirname, './views/student'));
app.set('admin', path.join(__dirname, './views/admin'));
app.set('faculty', path.join(__dirname, './views/faculty'));
app.set('alumni', path.join(__dirname, './views/alumni'));
app.set('pages', path.join(__dirname, './views/pages'));


// Define routes
//Demo Page route
app.get('/home', (req, res) => {
    res.render('home');
});

// Admin Requirements Request Page route
app.get('/landing', (req, res) => {
    res.render('landing');
});

// User Profile Page route
app.get('/users', (req, res) => {
    res.render('users');
});

//Signin Page route
app.get('/', (req, res) => {
    res.render('signin');
});

//Forget Password Page route
app.get('/forget', (req, res) => {
    res.render('forget');
});

//Signup Page route
app.get('/signup', (req, res) => {
    res.render('signup');
});

//DevOps Page route
app.get('/devops', (req, res) => {
    res.render('pages/devops');
});

// Student Homepage Page route
app.get('/student', (req, res) => {
    res.render('student/student');
});

// Student Chat Page route
app.get('/chat', (req, res) => {
    res.render('student/studentchat');
});

// Admin Homepage Page route
app.get('/admin', (req, res) => {
    res.render('admin/admin');
});

// Alumni Broadcast Page route
app.get('/alumnibroadcast', (req, res) => {
    res.render('admin/alumnibroadcast');
});

// Student Broadcast Page route
app.get('/studentbroadcast', (req, res) => {
    res.render('admin/studentbroadcast');
});

// Faculty Broadcast Page route
app.get('/facultybroadcast', (req, res) => {
    res.render('admin/facultybroadcast');
});

// Admin Event Upload Page route
app.get('/admineventsreq', (req, res) => {
    res.render('admin/admineventsreq');
});

// Admin Requirements Request Page route
app.get('/adminrequirements', (req, res) => {
    res.render('admin/adminrequirements');
});

// Faculty Homepage Page route
app.get('/faculty', (req, res) => {
    res.render('faculty/faculty');
});

// Faculty Event Upload Page route
app.get('/eventsreq', (req, res) => {
    res.render('faculty/eventsreq');
});

// Faculty Requirements Request Page route
app.get('/requirements', (req, res) => {
    res.render('faculty/requirements');
});

// Faculty Scholarship Approval Page route
app.get('/scholarapproval', (req, res) => {
    res.render('faculty/scholarapproval');
});

// Alumni Home Page route
app.get('/alumni', (req, res) => {
    res.render('alumni/alumni');
});

// Alumni Scholarship Fund Page route
app.get('/fund', (req, res) => {
    res.render('alumni/scholarshipfund');
});

// Alumni Chat Page route
app.get('/alumnichat', (req, res) => {
    res.render('alumni/alumnichat');
});

// Alumni Internship/Jobs Posting Page route
app.get('/post', (req, res) => {
    res.render('alumni/post');
});

// Events Page route
app.get('/events', (req, res) => {
    res.render('pages/events');
});

// Gallery Page route
app.get('/gallery', (req, res) => {
    res.render('pages/gallery');
});

// Scholarship Page route
app.get('/scholarship', (req, res) => {
    res.render('student/scholarship');
});

// Jobs/Internships Page route
app.get('/jobs', (req, res) => {
    res.render('pages/jobs');
});

// About Page route
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// Contact Us Page route
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
