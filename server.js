const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config()
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 4000;

// --------------------------CALL CONTROLLERS-------------------------
const languageCtrl = require('./controllers/languageController');
const questionCtrl = require('./controllers/questionsController');
// const solutionsCtrl = require('./controllers/solutionsController');
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
});

//Express Session
app.use(session({
    store: new MongoStore ({
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/delsecto'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //expire in 2 weeks
    }
}));

// ----------------------------ROUTES---------------------------------------
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/languages', languageCtrl);

app.use('/questions', questionCtrl);

app.use('/users', userCtrl);


app.listen(process.env.PORT || 3000)
