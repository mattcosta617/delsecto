const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {

    db.Language.find({}, (err, allLanguages) => {
        if(err) return console.log(err);

        res.render('languages/index', {
             languages: allLanguages,
        })
    });
});


// -----------Languages/new exists and works-------------------
router.get('/new', (req, res) => {
    db.Language.find({}, (err, languages) => {
        if(err) return console.log(err);
        
        res.render('languages/new');
    })
});



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
                
                res.redirect('languages/show');
            })
        })
    });
});






// -------------LANGUAGE BY ID PAGE---------------------

router.get('/:id', (req, res) => {
    db.Language.findById(req.params.id, (err, foundLanguage) => {
        if(err) return console.log(err);
       
         res.render('languages/show', {
             language: foundLanguage,
         });
        });
    });
    
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

          res.render('languages/edit', {
              language: editLanguage
          });
      });
  });

//   router.put('/:id', (req, res) => {
//       console.log('Updated Question = ', req.body);

//       db.Question.findByIdAndUpdate(
//           req.params.id,
//           req.body,
//           {new: true},
//           (err, updatedQuestion) => {
//               if (err) return console.log(err);

//               res.redirect('/questions');
//           }
//       );
//   });

//   //-----------------------DELETE-------------------------

//   router.delete('/:id', (req, res) => {
//       console.log('Deleting Question = ', req.params.id);

//     db.Question.findByIdAndDelete(req.params.id, (err, deletedQuestion) => {
//         if(err) return  console.log(err);

//         console.log("The Deleted Question = ", deletedQuestion);
//         res.redirect('/questions');
//     });
//   });
  


module.exports = router;