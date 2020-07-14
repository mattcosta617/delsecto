const express = require('express');
const router = express.Router();
const db = require('../models');
const User = require('../models/User');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/register', (req, res) => {
    res.render('users/register');
});
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/show', (req, res) => {
    res.render('users/show');
});

router.post('/register', (req, res) => {
    db.User.register(new db.User({
        username:req.body.username
    }),
        req.body.password,(err, user) => {
           if(err) {
                console.log(err);
                return res.render('users/register');
            }
            passport.authenticate('local')(req, res, function(){
                res.redirect('users/show');
           }); 
        });
    });

//login
router.get('/', (req, res) => {
    res.render('users/login');
});

router.post('/', passport.authenticate('local',{
    successRedirect:'/users/show',
    failureRedirect:'/users/login'
}),function(req, res){
    res.send("User is "+ req.user.id);
});

//logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('users/login');
}


module.exports = router;