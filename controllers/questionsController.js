const express = require('express');
const router = express.Router();
const db = require('../models');


// db.User.findById(req.session.currentUser._id, (err, foundUser) => {
//     if(err) return console.log(err);
//     user: foundUser,
// });

// -------------------Main Question page------------------
router.get('/', (req, res) => {

    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
        res.render('questions/index', {
            questions: allQuestions,
            user: foundUser,
            });
        });
    });
});


// -----------Questions/new exists and works-------------------
router.get('/new', (req, res) => {
    db.Question.find({}, (err, questions) => {
        if (err) return console.log(err);
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
            res.render('questions/new', {
                user: foundUser,
            });
        });
    })  
});


//-------------------- Post new question to /questions page ---------
router.post('/', (req, res) => {
    console.log('Request Body = ', req.body)

    db.Question.create(req.body, (err, newQuestion) => {
        if(err) return console.log(err);
            db.User.findById(req.session.currentUser._id, (err, foundUser) => {
                if(err) return console.log(err);
                console.log(foundUser);
                foundUser.questions.push(newQuestion);
                foundUser.save((err, savedUser) => {
                console.log('savedUser: ', savedUser);

                res.redirect('/questions');
            });
        });
    });
});



// -------------QUESTION BY ID PAGE---------------------
router.get('/:id', (req, res) => {
    db.Question.findById(req.params.id)
        .populate({path: 'solutions'})
        .exec((err, foundSolution) => {
        if(err) return console.log(err);
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
            res.render('questions/show', {
                question: foundSolution,
                user: foundUser,
            });
        });
    });
});


// -----------------------NEW QUESTION CREATED---------------
router.post('/', (req, res) => {
    console.log(req.body);
  
    db.Question.create(req.body, (err, newQuestion) => {
      if (err) return console.log(err);
  
      console.log(newQuestion);
      db.Question.findById(req.body.questionsId, (err, foundQuestion) => {
        foundQuestion.push(newQuestion);
        foundQuestion.save((err, savedQuestions) => {
          console.log('savedQuestions: ', savedQuestions);
          
          res.redirect('questions/show');
        })
      })
    });
  });

  // --------------------- edit----------------

  router.get('/:id/edit', (req, res) => {
      db.Question.findById(req.params.id, (err, editQuestion) => {
          if(err) return console.log(err);

          db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
    
            res.render('questions/edit', {
              question: editQuestion,
              user: foundUser,
          });
        });
      });
  });

  router.put('/:id', (req, res) => {
      console.log('Updated Question = ', req.body);

      db.Question.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new: true},
          (err, updatedQuestion) => {
              if (err) return console.log(err);

              res.redirect('/questions');
          }
      );
  });

  //-----------------------DELETE-------------------------

  router.delete('/:id', (req, res) => {
      console.log('Deleting Question = ', req.params.id);

    db.Question.findByIdAndDelete(req.params.id, (err, deletedQuestion) => {
        if(err) return  console.log(err);

        console.log("The Deleted Question = ", deletedQuestion);
        res.redirect('/questions');
    });
  });
  
  // ------------------Solutions-----------------------


router.post('/:id/solutions', function(req, res){
    db.Solution.create(req.body, (err, newSolution) => {
        db.Question.findByIdAndUpdate(req.params, {
            $push: {solutions: newSolution}
        }, (err, updatedQuestion) => {
            res.redirect(`/questions/${req.params.id}`);
        })
    });
});


module.exports = router;