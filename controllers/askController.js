const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

    db.Ask.find({}, (err, allAsks) => {
        if(err) return console.log(err);

        res.render('ask/index', {
            asks: allAsks,
        })
    });
});

router.get('/new', (req, res) => {
    res.render('ask/new');
});






module.exports = router;