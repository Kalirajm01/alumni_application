// app.js
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
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

// Admin Homepage Page route
app.get('/admin', (req, res) => {
    res.render('admin/admin');
});

// Faculty Homepage Page route
app.get('/faculty', (req, res) => {
    res.render('faculty/faculty');
});

// Alumni Homepage Page route
app.get('/alumni', (req, res) => {
    res.render('alumni/alumni');
});

//Events Page route
app.get('/events', (req, res) => {
    res.render('pages/events');
});

//Gallery Page route
app.get('/gallery', (req, res) => {
    res.render('pages/gallery');
});

//Scholarship Page route
app.get('/scholarship', (req, res) => {
    res.render('student/scholarship');
});

//Jobs/Internships Page route
app.get('/jobs', (req, res) => {
    res.render('pages/jobs');
});

//About Page route
app.get('/about', (req, res) => {
    res.render('pages/about');
});

//Contact Us Page route
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});