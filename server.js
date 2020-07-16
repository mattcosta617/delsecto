const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const PORT = process.env.PORT || 4000;


// --------------------------CALL CONTROLLERS-------------------------
const languageCtrl = require('./controllers/languageController');
const questionCtrl = require('./controllers/questionsController');
// const askCtrl = require('./controllers/askController');
const userCtrl = require('./controllers/userController');
const passport = require('passport');

// -------------------------VIEW ENGINE--------------------------------

app.set('view engine', 'ejs');

//---------------------------MIDDLEWARE--------------------------------

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`);
    next();
})

// ----------------------------ROUTES---------------------------------------

app.get('/', (req, res) => {
    res.render('home');
});
app.use('/languages', languageCtrl);

app.use('/questions', questionCtrl);

// app.use('/ask', askCtrl);

app.use('/users', userCtrl);

app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`));
