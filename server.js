const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// --------------------------CALL CONTROLLERS-------------------------

const languageCtrl = require('./controllers/languageController');
const questionCtrl = require('./controllers/questionsController');
const solutionsCtrl = require('./controllers/solutionsController');
const userCtrl = require('./controllers/userController');

// -------------------------VIEW ENGINE--------------------------------

app.set('view engine', 'ejs');

//---------------------------MIDDLEWARE--------------------------------


// ----------------------------ROUTES---------------------------------------

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/languages', (req, res) => {
    res.render(languageCtrl);
});

app.use('/questions', (req, res) => {
    res.render(questionCtrl);
});

app.use('/solutions', (req, res) => {
    res.render(solutionsCtrl);
});

app.use('/user', (req,res) => {
    res.render(userCtrl);
});

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`));