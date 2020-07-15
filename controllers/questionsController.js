const express = require('express');
const router = express.Router();
const db = require('../models');
let solutions = db.Question.solutions;





// -------------------Main Question page------------------
router.get('/', (req, res) => {

    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);

        res.render('questions/index', {
            questions: allQuestions,
        })
    });
});


// -----------Questions/new exists and works-------------------
router.get('/new', (req, res) => {
    db.Question.find({}, (err, questions) => {
        if (err) return console.log(err);
       res.render('questions/new'); 
    })  
});


//-------------------- Post new question to /questions page ---------
router.post('/', (req, res) => {
    console.log('Request Body = ', req.body)

    db.Question.create(req.body, (err, newQuestion) => {
        if(err) return console.log(err);

            res.redirect('/questions');
        })
});



// -------------QUESTION BY ID PAGE---------------------
router.get('/:id', (req, res) => {
    db.Question.findById(req.params.id, (err, foundQuestion) => {
        if(err) return console.log(err);

        res.render('questions/show', {
            question: foundQuestion,
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

          res.render('questions/edit', {
              question: editQuestion
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

    // router.put('/solutions')

// router.post('/:id', function(req, res){
//     db.Question.create(req.body, (err, solutions) => {
//     let solution = req.body.solution;
//     solutions = solution;
//     res.render('questions/:id', {
//         solutions
//     });
// });
// });


router.post('/:id/solutions', (req, res) => {
    db.Solution.find({}, (err, allSolutions) => {
        if (err) return console.log(err);
       res.render('solutions/index', {
           solution: allSolutions,
       }); 
    })  
});


router.get('/:id/solutions/new', (req, res) => {
    db.Solution.find({}, (err, solutions) => {
        if (err) return console.log(err);
       res.render('solutions/new'); 
    })  
});


router.get('/:id/solutions/show', (req, res) => {
    db.Solution.findById(req.params.id, (err, foundSolution) => {
        if(err) return console.log(err);

        res.render('solutions/show', {
            solution: foundSolution,
        });
    });
});









// router.put('/solutions/:id', (req, res) => {
//     console.log('New Answer = ', req.body);
//     db.Question.create(req.body, (err, newSolution) => {
//         if (err) return console.log(err);
    
//         console.log(newSolution);
//         db.Question.findById(req.body.solutionsId, (err, foundSolution) => {
//           foundSolution.push(newSolution);
//           foundSolution.save((err, savedSolutions) => {
//             console.log('savedSolutions: ', savedSolutions);
            
//             res.render('questions/:id', {
//                 savedSolutions
//             });
//           })
//         })
//       });
//     });



module.exports = router;