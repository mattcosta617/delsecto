const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

//DB
const db = require('../models');

//Login
router.get('/', (req, res) => {
  res.render('users/login');
});


//Register
router.get('/register', (req, res) => {
  res.render('users/register');
});

//////////////////////////////////////////////////
router.get('/show', (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if(err) return console.log(err);
        res.render('users/show', {
            user: foundUser,
        });
    });
});

router.post('/', (req, res) => {
  db.User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) return console.log(err);

    if (!foundUser) {
      return res.send('No User Found');
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);

      if (isMatch) {

        const currentUser = {
          _id: foundUser._id,
          username: foundUser.username,
          isLoggedIn: true,
        }

        req.session.currentUser = currentUser;
        res.redirect('/users/show');
        console.log(currentUser);
      } else {

        return res.send('Passwords do not match');
      }
    });
  });
});


// Register Create
router.post('/register', (req, res) => {
  // Verify req.body Is Not Empty

  // Query DB For Existing User By Email

  // If foundUser, Respond with 400

  // If No foundUser, Generate Salt and Hash User Password

  // Replace newUser Plain Text Password with Hased Password

  // Create newUser and Respond with 200

  // Check For Existing User Account
  db.User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) return console.log(err);

    // Return Error If Account Already Exists
    if (foundUser) return console.log('User Already Exsists');

    // Generate Hash Salt (This just makes the password hard to crack)
    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return console.log(err);

      // Turn the Plain Text Password Into A Complicated Hash
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);

        // Destructure New User Data From Request
        const { username, password } = req.body;

        // Construct New User Object with Hashed Password
        const newUser = {
          username,
          password: hash, // VERY IMPORTANT! NEVER SAVE PLAIN TEXT PASSWORD
        };

        // Create New User
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
      
          res.redirect('/users');
        });
      });
    });
  });
});


//Logout Route
router.get('/logout', (req, res) => {
  if (!req.session.currentUser) return res.send('You must be logged in to logout');

  req.session.destroy((err) => {
    if (err) return console.log(err);

    res.redirect('/users');
  });
});

//Check Users That Have Been Created
// db.User.find((err, foundUser) => {if (err)
//     console.log(err); console.log(foundUser); process.exit();
// });


module.exports = router;