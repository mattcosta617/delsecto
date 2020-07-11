const express = require('express');
const router = express.Router();
// const db = require('../models');

router.get('/', (req, res) => {

    // console.log('All questions = ', allQuestions);

    res.render('questions/index', {
        // users: allQuestions,
    })
});

router.get('/new', (req, res) => {
    res.render('questions/new');
});





module.exports = router;