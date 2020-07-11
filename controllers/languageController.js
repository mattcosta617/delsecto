const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

db.Language.find({}, (err, allLanguages) => {
    console.log('All languages = ', allLanguages);

    res.render('languages/index', {
        users: allLanguages,
    })
});
});

router.get('/new', (req, res) => {
    res.render('languages/new');
});



module.exports = router;