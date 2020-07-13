// const express = require('express');
// const router = express.Router();
// const db = require('../models');

// router.get('/', (req, res) => {

//     db.Ask.find({}, (err, allAsks) => {
//         if(err) return console.log(err);

//         res.render('ask/index', {
//             asks: allAsks,
//         })
//     });
// });

// //create new question
// router.post('/', (req, res) => {
//     console.log('Request body = ', req.body);

//     db.Ask.create(req.body, (err, newAsk) => {
//         if (err) return console.log(err);
//         console.log('New Ask = ', newAsk);
//         res.redirect('/questions')
//     })
// })

// module.exports = router;