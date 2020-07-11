const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

    db.User.find({}, (err, allUsers) => {
        if (err) return console.log(err);

    res.render('users/index', {
        users: allUsers,
    })
});
});

router.get('/new', (req, res) => {
    res.render('users/new');
});







module.exports = router;