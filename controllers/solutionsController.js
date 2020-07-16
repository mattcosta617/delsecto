// const express = require('express');
// const router = express.Router();
// const db = require('../models');

// router.get('/', (req, res) => {

//     db.Solutions.find({}, (err, allAsks) => {
//         if(err) return console.log(err);

//         res.render('ask/index', {
//             asks: allAsks,
//         })
//     });
// });

// create new question
// router.post('/', (req, res) => {
//     console.log('Request body = ', req.body);

//     db.Solution.create(req.body, (err, newSolution) => {
//         if (err) return console.log(err);
//         console.log('New Solution = ', newSolution);
//         res.redirect('/solutions')
//     })
// })

// router.get('/index', (req, res) => {
//     db.Question.find({}, (err, solutions) => {
//         if (err) return console.log(err);
//        res.render('solutions'); 
//     })  
// });


// router.get('/new', (req, res) => {
//     db.Question.find({}, (err, solutions) => {
//         if (err) return console.log(err);
//        res.render('solutions/new'); 
//     })  
// });




// module.exports = router;