const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/register', (req, res) => {
    res.render('users/register');
});

// router.get('/show', (req, res) => {
//     res.render('users/show');
// });

router.post('/users/show', (req, res) => {
    db.User.register(new db.User({username:req.body.username}),req.body.password,(err, user) => {
           if(err) {
                console.log(err);
                return res.render('users/register');
            }
            passport.authenticate('local')(req, res, function(){
                res.redirect('/users/show');
           }); 
        });
    });

//login
router.get('/', (req, res) => {
    res.render('users/login');
});


router.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;