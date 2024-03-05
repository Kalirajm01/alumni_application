// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = process.env.PORT || 4000;
// app.use(express.static('public'));

// // Set view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.set('student', path.join(__dirname, './views/student'));
// app.set('admin', path.join(__dirname, './views/admin'));
// app.set('faculty', path.join(__dirname, './views/faculty'));
// app.set('alumni', path.join(__dirname, './views/alumni'));
// app.set('pages', path.join(__dirname, './views/pages'));


// // Define routes
// //Demo Page route
// app.get('/home', (req, res) => {
//     res.render('home');
// });

// // Landing Page route
// app.get('/landing', (req, res) => {
//     res.render('landing');
// });

// // User Profile Page route
// app.get('/users', (req, res) => {
//     res.render('users');
// });

// //Signin Page route
// app.get('/', (req, res) => {
//     res.render('signin');
// });

// //Forget Password Page route
// app.get('/forget', (req, res) => {
//     res.render('forget');
// });

// //Signup Page route
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// //DevOps Page route
// app.get('/devops', (req, res) => {
//     res.render('pages/devops');
// });

// // Student Homepage Page route
// app.get('/student', (req, res) => {
//     res.render('student/student');
// });

// // Student Chat Page route
// app.get('/chat', (req, res) => {
//     res.render('student/studentchat');
// });

// // Admin Homepage Page route
// app.get('/admin', (req, res) => {
//     res.render('admin/admin');
// });

// // Alumni Broadcast Page route
// app.get('/alumnibroadcast', (req, res) => {
//     res.render('admin/alumnibroadcast');
// });

// // Student Broadcast Page route
// app.get('/studentbroadcast', (req, res) => {
//     res.render('admin/studentbroadcast');
// });

// // Faculty Broadcast Page route
// app.get('/facultybroadcast', (req, res) => {
//     res.render('admin/facultybroadcast');
// });

// // Admin Event Upload Page route
// app.get('/admineventsreq', (req, res) => {
//     res.render('admin/admineventsreq');
// });

// // Admin Requirements Request Page route
// app.get('/adminrequirements', (req, res) => {
//     res.render('admin/adminrequirements');
// });

// // Faculty Homepage Page route
// app.get('/faculty', (req, res) => {
//     res.render('faculty/faculty');
// });

// // Faculty Event Upload Page route
// app.get('/eventsreq', (req, res) => {
//     res.render('faculty/eventsreq');
// });

// // Faculty Requirements Request Page route
// app.get('/requirements', (req, res) => {
//     res.render('faculty/requirements');
// });

// // Faculty Scholarship Approval Page route
// app.get('/scholarapproval', (req, res) => {
//     res.render('faculty/scholarapproval');
// });

// // Alumni Home Page route
// app.get('/alumni', (req, res) => {
//     res.render('alumni/alumni');
// });

// // Alumni Scholarship Fund Page route
// app.get('/fund', (req, res) => {
//     res.render('alumni/scholarshipfund');
// });

// // Alumni Chat Page route
// app.get('/alumnichat', (req, res) => {
//     res.render('alumni/alumnichat');
// });

// // Alumni Internship/Jobs Posting Page route
// app.get('/post', (req, res) => {
//     res.render('alumni/post');
// });

// // Events Page route
// app.get('/events', (req, res) => {
//     res.render('pages/events');
// });

// // Events Registration Page route
// app.get('/eventsreg', (req, res) => {
//     res.render('pages/eventsreg');
// });

// // Gallery Page route
// app.get('/gallery', (req, res) => {
//     res.render('pages/gallery');
// });

// // Scholarship Page route
// app.get('/scholarship', (req, res) => {
//     res.render('student/scholarship');
// });

// // Jobs/Internships Page route
// app.get('/jobs', (req, res) => {
//     res.render('pages/jobs');
// });

// // About Page route
// app.get('/about', (req, res) => {
//     res.render('pages/about');
// });

// // Contact Us Page route
// app.get('/contact', (req, res) => {
//     res.render('pages/contact');
// });

// // Executive Home Page route
// app.get('/executive', (req, res) => {
//     res.render('executive/executive');
// });

// // Executive Broadcast Page route
// app.get('/executivebroadcast', (req, res) => {
//     res.render('executive/executivebroadcast');
// });

// // Executive RBAC Page route
// app.get('/control', (req, res) => {
//     res.render('executive/rbac');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const multer = require('multer');
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

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'alumni'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
//Demo Page route
app.get('/home', (req, res) => {
  res.render('home');
});

// Landing Page route
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

// Signin route
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Query the database to find the user by username
  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).send('Internal server error');
    }

    // Check if user exists
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).send('Invalid password');
    }

    // Redirect to the corresponding user page and pass the username
    switch (user.role) {
      case 'student':
        res.render('student/student', { username: username });
        break;
      case 'alumni':
        res.render('alumni/alumni', { username: username });
        break;
      case 'faculty':
        res.render('faculty/faculty', { username: username });
        break;
      case 'admin':
        res.render('admin/admin', { username: username });
        break;
      case 'executive':
          res.render('executive/executive', { username: username });
          break;
      default:
        res.redirect('/');
        break;
    }
  });
});

//Forget Password Page route
app.get('/forget', (req, res) => {
  res.render('forget');
});

app.post('/forget', (req, res) => {
  const { email } = req.body;
  sendPasswordResetEmail(email);
  res.redirect('/');
});

// Function to send password reset email
function sendPasswordResetEmail(email) {
  // Create a Nodemailer transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alumnitest2024@gmail.com',
      pass: 'Alumni@1234' 
    }
  });

  let token = generateToken();

  let mailOptions = {
    from: 'alumnitest2024@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: 'Click the following link to reset your password: http://yourdomain.com/reset/${token}'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
}

function generateToken() {
  return 'random-token';
}

module.exports = sendPasswordResetEmail;


//Signup Page route
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Signup route
app.post('/signup', (req, res) => {
    // Extract signup data from request body
    const { username, email, password, phone, role } = req.body;
  
    // Insert the signup data into MySQL database
    const sql = 'INSERT INTO users (username, email, password, phone, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [username, email, password, phone, role], (err, result) => {
      if (err) {
        console.error('Error signing up:', err);
        return res.status(500).send('Internal server error');
      }
      console.log('User signed up successfully');
      // Redirect to the signin page
      res.redirect('/');
    });
  });

//DevOps Page route
app.get('/devops', (req, res) => {
  res.render('pages/devops');
});

// Student Homepage Page route
app.get('/student', (req, res) => {
  res.render('student/student');
});

// Student Chat Split Page route
app.get('/schat', (req, res) => {
  res.render('student/schat');
});

// Student Connection Page route
app.get('/sconnection', (req, res) => {
  res.render('student/sconnection');
});

// Student to Student Chat Page route
app.get('/chat', (req, res) => {
  res.render('student/studentchat');
});

// Student to Alumni Chat Page route
app.get('/achat', (req, res) => {
  res.render('student/achat');
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


const upload = multer({ dest: 'uploads/' });
app.post('/submit-form', upload.single('eventImage'), (req, res) => {
  const { eventName, eventLocation, eventDate, eventTime, department, contactDetails, description } = req.body;
  const eventImage = req.file.filename; // Multer renames the file and adds a "filename" property

  // Insert form data into MySQL
  const sql = 'INSERT INTO events (eventName, eventLocation, eventDate, eventTime, department, contactDetails, description, eventImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [eventName, eventLocation, eventDate, eventTime, department, contactDetails, description, eventImage], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Error inserting data into MySQL');
      return;
    }
    console.log('Data inserted into MySQL');
    res.status(200).send('Data inserted into MySQL');
  });
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

// Alumni About Page route
app.get('/aabout', (req, res) => {
  res.render('alumni/about');
});

// Alumni to Student Chat Page route
app.get('/aevents', (req, res) => {
  res.render('alumni/aevents');
});

// Admin Homepage Page route
app.get('/admin', (req, res) => {
  res.render('admin/admin');
});

// Alumni Broadcast Page route
app.get('/alumnibroadcast', (req, res) => {
  res.render('admin/alumnibroadcast');
});

// Alumni Scholarship Fund Page route
app.get('/fund', (req, res) => {
  res.render('alumni/scholarshipfund');
});

// Alumni Chat Split Page route
app.get('/aschat', (req, res) => {
  res.render('alumni/aschat');
});

// Alumni to Alumni Chat Page route
app.get('/alumnichat', (req, res) => {
  res.render('alumni/alumnichat');
});

// Alumni Connection Page route
app.get('/aconnection', (req, res) => {
  res.render('alumni/aconnection');
});

// Alumni to Student Chat Page route
app.get('/aachat', (req, res) => {
  res.render('alumni/aachat');
});

// Alumni Internship/Jobs Posting Page route
app.get('/post', (req, res) => {
  res.render('alumni/post');
});

const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'alumni'
};

// Route to handle Jobs/Internships form submission
app.post('/jobs-form', async (req, res) => {
  try {
      // Connect to MySQL database
      const connection = await mysql.createConnection(dbConfig);

      // Extract form data from the request body
      const { title, type, company, location, description, requirements, department, contact, apply_by } = req.body;

      // Insert data into MySQL database
      await connection.query('INSERT INTO jobs_internships (title, type, company, location, description, requirements, department, contact, apply_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, type, company, location, description, requirements, department, contact, apply_by]);

      // Close MySQL connection
      await connection.end();

      // Send a success response
      res.status(200).send('Form submitted successfully');
      res.redirect('/post');
  } catch (error) {
      console.error('Error:', error);
      // Send an error response
      res.status(500).send('Internal Server Error');
  }
});


// Events Page route
app.get('/events', (req, res) => {
  res.render('pages/events');
});

// Events Registration Page route
app.get('/eventsreg', (req, res) => {
  res.render('pages/eventsreg');
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

// Executive Home Page route
app.get('/executive', (req, res) => {
  res.render('executive/executive');
});

// Executive Broadcast Page route
app.get('/executivebroadcast', (req, res) => {
  res.render('executive/executivebroadcast');
});

// Executive RBAC Page route
app.get('/control', (req, res) => {
  res.render('executive/rbac');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
