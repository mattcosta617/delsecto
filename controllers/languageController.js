const express = require('express');
const router = express.Router();
const db = require('../models');

// router.get('/', (req, res) => {

//     db.Questions.findById(req.body.), (err, allQuestions) => {
//         if(err) return console.log(err);
//         db.User.findById(req.session.currentUser._id, (err, foundUser) => {
//             if(err) return console.log(err);

//             res.render('languages/index', {
//                 questions: allQuestions,
//                 user: foundUser,
//             });
//         });
//     });
// });

router.get('/', (req, res) => {

<<<<<<< HEAD
    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
        res.render('languages/index', {
            questions: allQuestions,
            user: foundUser,
            });
=======
    db.Language.find({}, (err, allLanguages) => {
        if(err) return console.log(err);
        // db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);

            res.render('languages/index', {
                languages: allLanguages,
                // user: foundUser,
            })
>>>>>>> 7a3578a43c3ccddd5d876800822c4654486d27b0
        });
    });
// });


// -----------Languages/new exists and works-------------------
router.get('/new', (req, res) => {
    db.Language.find({}, (err, languages) => {
        if(err) return console.log(err);
        // db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
            
            res.render('languages/new', {
                // user: foundUser,
            });
        })
    });
// });



// -----------------------NEW LANGUAGE CREATED---------------
router.post('/', (req, res) => {
    console.log(req.body);
    
    db.Language.create(req.body, (err, newLanguage) => {
        if (err) return console.log(err);
        
        console.log(newLanguage);
        db.Language.findById(req.body.language, (err, foundLanguage) => {
            foundLanguage.push(newLanguage);
            foundLanguage.save((err, savedLanguages) => {
                console.log('savedLanguages: ', savedLanguages);
                
                res.redirect('/languages/show');
            })
        })
    });
});







// -------------LANGUAGE BY ID PAGE---------------------

router.get('/:id', (req, res) => {
    db.Language.findById(req.params.id) 
        .populate({path: "questions"})
        .exec((err, foundLanguage) => {
        if(err) return console.log(err);
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);     
        
            res.render('languages/show', {
                language: foundLanguage,
                // user: foundUser,
            });
        });
    });
// });

    
    //-------------------- Post new language to /languages page ---------
    router.post('/', (req, res) => {
        console.log('Request Body =', req.body)
    
        db.Language.create(req.body, (err, newLanguage) => {
            if(err) return console.log(err);
    
            res.redirect('/languages');
        });
    });




    // --------------------- edit----------------

  router.get('/:id/edit', (req, res) => {
      db.Language.findById(req.params.id, (err, editLanguage) => {
          if(err) return console.log(err);
        //   db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if(err) return console.log(err);
            
        
            res.render('languages/edit', {
            //   user: foundUser,
              language: editLanguage
          });
        });
      });
//   });

  router.put('/:id', (req, res) => {
      console.log('Updated Language = ', req.body);

      db.Language.findByIdAndUpdate(
          req.params.id,
          req.body,
          {new: true},
          (err, updatedLanguage) => {
              if (err) return console.log(err);

              res.redirect('/languages');
          }
      );
  });

  //-----------------------DELETE-------------------------

  router.delete('/:id', (req, res) => {
      console.log('Deleting Language = ', req.params.id);

    db.Language.findByIdAndDelete(req.params.id, (err, deletedLanguage) => {
        if(err) return  console.log(err);

        console.log("The Deleted Language = ", deletedLanguage);
        res.redirect('/languages');
    });
  });
  


module.exports = router;