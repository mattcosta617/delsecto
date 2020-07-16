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


// //-------------------- Post new question to /questions page ---------
// router.post('/', (req, res) => {
//     console.log('Request Body = ', req.body)
    

<<<<<<< HEAD
//     db.Question.create(req.body, (err, newQuestion) => {
//         if(err) return console.log(err);
//         console.log("This is where we are now");
//             res.redirect('/questions');
//         })
// });

=======
    db.Question.create(req.body, (err, newQuestion) => {
        if(err) return console.log(err);
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
            
        // db.User.findById(req.body.userId, (err, foundUser) => {
        //     foundUser.questions.push(newQuestion);
        //     foundUser.save((err, savedUser) => {
        //       console.log('savedUser: ', savedUser);

            res.redirect('/questions', {
                user: foundUser,
            });
        })
    });
});
>>>>>>> 72c990b824fcb8225512879aec9e2526ef39d9b7



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
        console.log("This is it");
      console.log(newQuestion);
     db.Language.find({language: newQuestion.languageId}, (err, foundLanguage) => {
        if (err) return console.log(err);

        console.log(foundLanguage);
        console.log(foundLanguage[0].questions);
        foundLanguage[0].questions.push(newQuestion);
        foundLanguage[0].save((err, savedLanguage) => {
            if(err) return console.log(err);
            console.log(savedLanguage);

            res.redirect('/questions');
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
        db.Question.findByIdAndUpdate(req.params.id, {
            $push: {solutions: newSolution}
        }, (err, updatedQuestion) => {
            res.redirect(`/questions/${req.params.id}`);
        })
    });
});

// --------------------- edit SOLUTION----------------

router.get('/:id/solutions', (req, res) => {
    db.Solution.findById(req.params.id, (err, editSolution) => {
        if(err) return console.log(err);

        res.render('questions/solutions', {
            solution: editSolution
        });
    });
});

router.put('/:id', (req, res) => {
    console.log('Updated Solution = ', req.body);

    db.Solution.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedSolution) => {
            db.Question.findById(
                
            )
            if (err) return console.log(err);

            res.redirect('/questions/:id');
        }
    );
});

//--------------------_DELETE SOLUTION------------------

router.delete('/:id', (req, res) => {
    console.log('Deleting Solution = ', req.params.id);

  db.Solution.findByIdAndDelete(req.params.id, (err, deletedSolution) => {
      if(err) return  console.log(err);

      console.log("The Deleted Solution = ", deletedSolution);
      res.redirect('/questions/:id');
  });
});


module.exports = router;