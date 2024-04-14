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
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
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

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'alumni'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


// Initialize MySQL connection pool
const connection1 = mysql.createPool({
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
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy for authenticating users
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
      // Query the database for the user
      connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
          if (err) { return done(err); }
          if (!rows.length) {
              return done(null, false, { message: 'Incorrect email.' });
          }
          const user = rows[0];
          if (password !== user.password) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      });
  }
));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
      done(err, rows[0]);
  });
});


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

// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

// // Signup route
// app.post('/signup', (req, res) => {
//     const { username, email, password, phone, role } = req.body;
//     bcrypt.hash(password, 10, (err, hash) => {
//         if (err) {
//             console.error('Error hashing password:', err);
//             return res.status(500).send('Internal server error');
//         }

//         const sql = 'INSERT INTO users (username, email, password, phone, role) VALUES (?, ?, ?, ?, ?)';
//         connection.query(sql, [username, email, hash, phone, role], (err, result) => {
//             if (err) {
//                 console.error('Error signing up:', err);
//                 return res.status(500).send('Internal server error');
//             }
//             console.log('User signed up successfully');
//             res.redirect('/');
//         });
//     });
// });


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
  connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
          console.error('Error fetching users:', err);
          res.status(500).send('Internal Server Error');
      } else {
          const users = results.map(user => {
              if (!user.profile_image) {
                  user.profile_image = 'img/download.png'; 
              }
              return user;
          });
          res.render('student/sconnection', { users });
      }
  });
});

// Route to render the Student to Alumni chat page
app.get('/chat', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
      if (err) {
          console.error('Error fetching messages:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.render('student/studentchat.ejs', { messages: results });
      }
  });
});

// Route to handle form submission and store messages in MySQL
app.post('/send-message', (req, res) => {
  const { message, filterBatch, filterDepartment } = req.body;
  const sql = 'INSERT INTO messages (sender, content, timestamp, batch, department) VALUES (?, ?, NOW(), ?, ?)';
  connection.query(sql, ['student', message, filterBatch, filterDepartment], (err, result) => {
      if (err) {
          console.error('Error storing message:', err);
          res.status(500).send('Internal Server Error');
      } else {
          console.log('Message stored successfully');
          res.redirect('/chat');
      }
  });
});



// Student to Alumni Chat Page route
// Route to render the Student to Student chat page
app.get('/achat', (req, res) => {
  connection.query('SELECT * FROM studentmessages', (err, results) => {
      if (err) {
          console.error('Error fetching messages:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.render('student/achat.ejs', { messages: results });
      }
  });
});

// Route to handle form submission and store messages in MySQL
app.post('/student-message', (req, res) => {
  const { message, filterBatch, filterDepartment } = req.body;
  const sql = 'INSERT INTO studentmessages (sender, content, timestamp, batch, department) VALUES (?, ?, NOW(), ?, ?)';
  connection.query(sql, ['student', message, filterBatch, filterDepartment], (err, result) => {
      if (err) {
          console.error('Error storing message:', err);
          res.status(500).send('Internal Server Error');
      } else {
          console.log('Message stored successfully');
          res.redirect('/achat');
      }
  });
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
app.get('/admineventsreq', (req, res) =>  {
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
  const eventImage = req.file.filename;

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

// Alumni to Student Chat Page route
// Route to render the Alumni to Student chat page
app.get('/alumnichat', (req, res) => {
  connection.query('SELECT * FROM messages', (err, results) => {
      if (err) {
          console.error('Error fetching messages:', err);
          res.status(500).send('Internal Server Error');
      } else {
          res.render('alumni/alumnichat.ejs', { messages: results });
      }
  });
});

// Route to handle form submission and store messages in MySQL
app.post('/send1-message', (req, res) => {
  const { message, filterBatch, filterDepartment } = req.body;
  const sql = 'INSERT INTO messages (sender, content, timestamp, batch, department) VALUES (?, ?, NOW(), ?, ?)';
  connection.query(sql, ['Alumni', message, filterBatch, filterDepartment], (err, result) => {
      if (err) {
          console.error('Error storing message:', err);
          res.status(500).send('Internal Server Error');
      } else {
          console.log('Message stored successfully');
          res.redirect('/alumnichat');
      }
  });
});

// Alumni Connection Page route
app.get('/aconnection', (req, res) => {
  res.render('alumni/aconnection');
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

// Route for rendering map
app.get('/map', (req, res) => {
  // Pass location data to the view
  const locations = [
      { name: 'Location 1', lat: 40.7128, lng: -74.006 },
      { name: 'Location 2', lat: 34.0522, lng: -118.243 },
      { name: 'Location 3', lat: 51.5074, lng: -0.1278 }
  ];
  res.render('map', { locations });
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



// Define routes
// Jobs/Internships Page route
app.get('/jobs', (req, res) => {
  connection.query('SELECT * FROM post', (error, results, fields) => {
      if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.render('pages/jobs', { data: results });
  });
});


app.post('/apply', (req, res) => {
  const { title } = req.body;
  const contactEmail = "kalirajm01@gmail.com";
  const mailOptions = {
      from: 'alumnitest2024@gmail.com',
      to: contactEmail,
      subject: 'New Job/Internship Application',
      text: `A student has applied for the position "${title}". Please review and approve the application.`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
      } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Application submitted successfully');
      }
  });
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { title, typeofpost, companyname, location, descriptions, requirement, department, contact, apply_by } = req.body;

  // Insert data into MySQL
  const sql = 'INSERT INTO post (title, typeofpost, companyname, location, descriptions, requirement, department, contact, apply_by) VALUES (?,?,?,?,?, ?, ?,?,?)';
  connection.query(sql, [title, typeofpost, companyname, location, descriptions, requirement, department, contact, apply_by], (error, results, fields) => {
      if (error) {
          console.error('Error executing MySQL query:', error);
          res.status(500).send('Internal Server Error');
          return;
      }
      res.send('Successfully Posted!!');
  });
});


// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "alumnitest2024@gmail.com",
    pass: "fzzo bava mtup jhde",
  },
});


//Faculty Requirements Upload
// Route to handle form submission and send emails
app.post('/send-email', (req, res) => {
  const { requesterName, eventType, otherEventType, date, duration, department, studentCount, contactDetails, description } = req.body;

  // Compose the email message
  const message = `
      Requester Name: ${requesterName}
      Event Type: ${eventType === 'Other' ? otherEventType : eventType}
      Date: ${date}
      Duration: ${duration}
      Department: ${department}
      Audience Count: ${studentCount}
      Contact Details: ${contactDetails}
      Description: ${description}
  `;
    // Compose the HTML email message
const htmlMessage = `
<div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007bff;">New Requirements Request Details</h2>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Requester Name:</p>
            <p>${requesterName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Event Type:</p>
            <p>${eventType === 'Other' ? otherEventType : eventType}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Date:</p>
            <p>${date}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Duration:</p>
            <p>${duration}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Department:</p>
            <p>${department}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Audience Count:</p>
            <p>${studentCount}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Contact Details:</p>
            <p>${contactDetails}</p>
        </div>
        <div>
            <p style="font-weight: bold; margin-bottom: 5px;">Description:</p>
            <p>${description}</p>
        </div>
    </div>
</div>
`;

  // Specify the recipients' email addresses
  const recipients = ['kalirajm01@gmail.com', 'd22z605@psgitech.ac.in'];

  // Send email to each recipient
  recipients.forEach(recipient => {
      const mailOptions = {
          from: 'alumnitest2024@gmail.com',
          to: recipient,
          subject: 'New Event Request',
          text: message,
          html: htmlMessage
      };

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error('Error sending email:', err);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  });

  res.redirect('/reuirements'); // Redirect to home page or a confirmation page
});


//Admin Requirements Upload
// Route to handle form submission and send emails
app.post('/asend-email', (req, res) => {
  const { requesterName, eventType, otherEventType, date, duration, department, studentCount, contactDetails, description } = req.body;

  // Compose the email message
  const message = `
      Requester Name: ${requesterName}
      Event Type: ${eventType === 'Other' ? otherEventType : eventType}
      Date: ${date}
      Duration: ${duration}
      Department: ${department}
      Audience Count: ${studentCount}
      Contact Details: ${contactDetails}
      Description: ${description}
  `;
  
  // Compose the HTML email message
const htmlMessage = `
<div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007bff;">New Requirements Request Details</h2>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Requester Name:</p>
            <p>${requesterName}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Event Type:</p>
            <p>${eventType === 'Other' ? otherEventType : eventType}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Date:</p>
            <p>${date}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Duration:</p>
            <p>${duration}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Department:</p>
            <p>${department}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Audience Count:</p>
            <p>${studentCount}</p>
        </div>
        <div style="margin-bottom: 20px;">
            <p style="font-weight: bold; margin-bottom: 5px;">Contact Details:</p>
            <p>${contactDetails}</p>
        </div>
        <div>
            <p style="font-weight: bold; margin-bottom: 5px;">Description:</p>
            <p>${description}</p>
        </div>
    </div>
</div>
`;

  // Specify the recipients' email addresses
  const recipients = ['kalirajm01@gmail.com', 'd22z605@psgitech.ac.in'];

  // Send email to each recipient
  recipients.forEach(recipient => {
      const mailOptions = {
          from: 'alumnitest2024@gmail.com',
          to: recipient,
          subject: 'New Requirement from PSG ITAR',
          text: message,
          html: htmlMessage
      };

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error('Error sending email:', err);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  });

  res.redirect('/adminrequirements'); // Redirect to home page or a confirmation page
});

const roleEmailMap = {
  student: ['kalirajm01@gmail.com', 'd22z701@psgitech.ac.in'],
  alumni: ['alumnitest2024@gmail.com', '21z153@psgitech.ac.in'],
  faculty: ['d22z605@psgitech.ac.in']
};


//Executive Broadcast
// Route to handle form submission and send emails
app.post('/ebroadcast-message', (req, res) => {
  const { fromInput, role, messageInput } = req.body;

  // Compose the email message
  const message = `
      From Name: ${fromInput}
      Message: ${messageInput}
  `;

  const htmlMessage = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 16px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333333;">PSG iTech Alumni Association</h2>
          <p><strong>Wished by:</strong> ${fromInput}</p>
          <p><strong>Message:</strong></p>
          <p>${messageInput}</p>
      </div>
  </div>
`;

  // Get the recipients based on the selected role
  const recipients = roleEmailMap[role];

  if (!recipients) {
      console.error('Invalid role selected');
      return res.status(400).send('Invalid role selected');
  }

  // Send email to each recipient
  recipients.forEach(recipient => {
      const mailOptions = {
          from: 'alumnitest2024@gmail.com',
          to: recipient,
          subject: 'New Broadcast has been created',
          text: message,
          html: htmlMessage
      };

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error('Error sending email:', err);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  });

  res.redirect('/executivebroadcast'); // Redirect to home page or a confirmation page
});


//Admin Broadcast
// Route to handle form submission and send emails
app.post('/abroadcast-message', (req, res) => {
  const { fromInput, role, messageInput } = req.body;

  // Compose the email message
  const message = `
      From Name: ${fromInput}
      Message: ${messageInput}
  `;

  const htmlMessage = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 16px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333333;">PSG iTech Alumni Association</h2>
          <p><strong>Wished by:</strong> ${fromInput}</p>
          <p><strong>Message:</strong></p>
          <p>${messageInput}</p>
      </div>
  </div>
`;

  // Get the recipients based on the selected role
  const recipients = roleEmailMap[role];

  if (!recipients) {
      console.error('Invalid role selected');
      return res.status(400).send('Invalid role selected');
  }

  // Send email to each recipient
  recipients.forEach(recipient => {
      const mailOptions = {
          from: 'alumnitest2024@gmail.com',
          to: recipient,
          subject: 'New Broadcast has been created',
          text: message,
          html: htmlMessage
      };

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error('Error sending email:', err);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  });

  res.redirect('/alumnibroadcast'); // Redirect to home page or a confirmation page
});


//Scholarship Submission
// Route to handle form submission and send emails
app.post('/email-scholarship', (req, res) => {
  // const { requesterName, eventType, otherEventType, date, duration, department, studentCount, contactDetails, description } = req.body;

  // Compose the email message
  // const message = `
  //     Requester Name: ${requesterName}
  //     Event Type: ${eventType === 'Other' ? otherEventType : eventType}
  //     Date: ${date}
  //     Duration: ${duration}
  //     Department: ${department}
  //     Audience Count: ${studentCount}
  //     Contact Details: ${contactDetails}
  //     Description: ${description}
  // `;

  
    // Compose the HTML email message
// const htmlMessage = `
// <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
//     <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//         <h2 style="color: #007bff;">New Requirements Request Details</h2>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Requester Name:</p>
//             <p>${requesterName}</p>
//         </div>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Event Type:</p>
//             <p>${eventType === 'Other' ? otherEventType : eventType}</p>
//         </div>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Date:</p>
//             <p>${date}</p>
//         </div>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Duration:</p>
//             <p>${duration}</p>
//         </div>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Department:</p>
//             <p>${department}</p>
//         </div>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Audience Count:</p>
//             <p>${studentCount}</p>
//         </div>
//         <div style="margin-bottom: 20px;">
//             <p style="font-weight: bold; margin-bottom: 5px;">Contact Details:</p>
//             <p>${contactDetails}</p>
//         </div>
//         <div>
//             <p style="font-weight: bold; margin-bottom: 5px;">Description:</p>
//             <p>${description}</p>
//         </div>
//     </div>
// </div>
// `;

  // Specify the recipients' email addresses
  const recipients = ['d22z605@psgitech.ac.in'];

  // Send email to each recipient
  recipients.forEach(recipient => {
      const mailOptions = {
          from: 'alumnitest2024@gmail.com',
          to: recipient,
          subject: 'New Scholarship Applied',
          text: "message",
          // html: htmlMessage
      };

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error('Error sending email:', err);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  });

  res.redirect('/scholarship'); // Redirect to home page or a confirmation page
});
