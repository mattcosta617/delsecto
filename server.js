const express = require('express');
const app = express();
const methodOverride = require('method-override');
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

// --------------------------CALL CONTROLLERS-------------------------
const languageCtrl = require('./controllers/languageController');
const questionCtrl = require('./controllers/questionsController');
const solutionsCtrl = require('./controllers/solutionsController');
const userCtrl = require('./controllers/userController');

// -------------------------VIEW ENGINE--------------------------------

app.set('view engine', 'ejs');

//---------------------------MIDDLEWARE--------------------------------

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('method-override'));

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`);
    next();
})

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

const db = require('./', (req, res) => {
    res.send("Hello! Welcome to Delsecto!")
});


app.listen(PORT, () => console.log(``));
//