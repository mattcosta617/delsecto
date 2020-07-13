const express = require('express');
const router = express.Router();
const db = require('../models');




// -------------------Main Question page------------------
router.get('/', (req, res) => {

    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);

        res.render('questions/index', {
            questions: allQuestions,
        })
    });
});


// -----------Questions/new exists and works but holds no function yet---
router.get('/new', (req, res) => {
    db.Question.find({}, (err, questions) => {
        if (err) return console.log(err);
       res.render('questions/new'); 
    })  
});


//-------------------- Almost works but does not post new question to page yet
router.post('/', (req, res) => {
    console.log('Request Body = ', req.body)

    db.Question.create(req.body, (err, newQuestion) => {
        if(err) return console.log(err);

            res.redirect('/questions');
        })
});



// -------------Attempted id page but currently no page occuring
router.get('/:id', (req, res) => {
    db.Questions.findById(req.params.id, (err, foundQuestion) => {
        if(err) return console.log(err);

        res.render('questions/show', {
            question: foundQuestion,
        });
    });
});


// -----------------------This is my attempt to create new question pages but currently does not work
router.post('/', (req, res) => {
    console.log(req.body);
  
    db.Question.create(req.body, (err, newQuestion) => {
      if (err) return console.log(err);
  
      console.log(newQuestion);
      db.Question.findById(req.body.QuestionsId, (err, foundQuestion) => {
        foundQuestion.articles.push(newQuestion);
        foundQuestion.save((err, savedQuestions) => {
          console.log('savedQuestions: ', savedQuestions);
          
          res.redirect('/questions/new');
          res.post(Question);
        })
      })
    });
  });


module.exports = router;