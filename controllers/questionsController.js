const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);

    res.render('questions/index', {
        questions: allQuestions,
    })
});
});

router.get('/new', (req, res) => {
    res.render('questions/new');
});





module.exports = router;