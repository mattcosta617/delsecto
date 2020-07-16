const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../models');
const session = require('express-session');


//Login
router.get('/', (req, res) => {
  res.render('users/login');
});


//Register
router.get('/register', (req, res) => {
  res.render('users/register');
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
          questions: foundUser
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

//Profile home
router.get('/show', (req, res) => {
    console.log(req.session);

    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
        if(err) return console.log(err);
        res.render('users/show', {
            user: foundUser,
        });
    });
});


// Register Create
router.post('/register', (req, res) => {
  db.User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) return console.log(err);

    if (foundUser) return console.log('User Already Exsists');

    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return console.log(err);

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);

        const { username, password } = req.body;

        const newUser = {
          username,
          password: hash, //hash = hide password
        };

        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
      
          res.redirect('/users');
        });
      });
    });
  });
});


//Logout
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

// db.User.find((err, foundUser) => {if (err)
//     console.log(err); console.log(foundUser); process.exit();
// });
console.log(session);

module.exports = router;