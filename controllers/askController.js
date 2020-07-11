const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

    db.Ask.find({}, (err, allAsks) => {
    console.log('All asks = ', allAsks);

    res.render('ask/index', {
        asks: allAsks,
    })
});
});

router.get('/new', (req, res) => {
    res.render('ask/new');
});






module.exports = router;