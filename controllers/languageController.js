const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

    db.Question.find({}, (err, allLanguages) => {
        if(err) return console.log(err);

        res.render('languages/index', {
             languages: allLanguages,
        })
    });
});

router.get('/', (req, res) => {
    router.get('/show', (req, res) => {
       
        req.params.Question.questions.languages; 
         res.render('languages/show');
    })

})

router.get('/new', (req, res) => {
    res.render('languages/new');
});



module.exports = router;